import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { supabase } from '../../supabase';
import { CheckCircle, XCircle, Camera, RefreshCw } from 'lucide-react';

const Scan = () => {
  const [data, setData] = useState('No result');
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [message, setMessage] = useState('');
  const [scanning, setScanning] = useState(true);

  const handleResult = async (result, error) => {
    if (!!result) {
      const qrString = result?.text;
      setData(qrString);
      setScanning(false);
      validateTicket(qrString);
    }

    if (!!error) {
      // console.info(error);
    }
  };

  const validateTicket = async (qrString) => {
    setStatus('loading');
    try {
      // Format: userId-eventId-timestamp
      const [userId, eventId] = qrString.split('-');
      
      const { data: registration, error } = await supabase
        .from('registrations')
        .select('*, events(title)')
        .eq('qr_code_string', qrString)
        .single();

      if (error || !registration) {
        setStatus('error');
        setMessage('Invalid Ticket or Registration not found.');
        return;
      }

      // Here you could also check if the current user (coordinator) 
      // is authorized for this specific eventId
      
      setStatus('success');
      setMessage(`Valid Ticket for ${registration.events.title}`);
    } catch (err) {
      setStatus('error');
      setMessage('Error validating ticket.');
    }
  };

  const resetScanner = () => {
    setScanning(true);
    setStatus('idle');
    setData('No result');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Camera className="text-blue-500" /> Coordinator Scanner
      </h1>

      <div className="w-full max-w-md aspect-square bg-black rounded-2xl overflow-hidden border-4 border-gray-800 relative">
        {scanning ? (
          <QrReader
            onResult={handleResult}
            constraints={{ facingMode: 'environment' }}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            {status === 'success' && (
              <>
                <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-500">Access Granted</h2>
                <p className="mt-2 text-gray-300">{message}</p>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="w-20 h-20 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="mt-2 text-gray-300">{message}</p>
              </>
            )}
            <button 
              onClick={resetScanner}
              className="mt-8 px-6 py-2 bg-blue-600 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700"
            >
              <RefreshCw className="w-5 h-5" /> Scan Next
            </button>
          </div>
        )}
        
        {scanning && (
          <div className="absolute inset-0 border-2 border-blue-500/50 pointer-events-none animate-pulse">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </div>
        )}
      </div>

      <div className="mt-8 text-gray-400 text-sm">
        Point the camera at the student's QR code
      </div>
    </div>
  );
};

export default Scan;
