import React from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export function ErrorModal({ 
  isOpen, 
  onClose, 
  title = "Error", 
  message, 
  errors 
}: ErrorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {message && (
          <div className="text-red-600 font-medium">
            {message}
          </div>
        )}
        
        {errors && Object.keys(errors).length > 0 && (
          <div className="space-y-2">
            {Object.entries(errors).map(([field, fieldErrors]) => (
              <div key={field}>
                <div className="font-medium text-gray-700 capitalize mb-1">
                  {field}:
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {fieldErrors.map((error, index) => (
                    <li key={index} className="text-red-600 text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-end pt-4">
          <Button onClick={onClose} className="bg-black text-white hover:bg-gray-800">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
}
