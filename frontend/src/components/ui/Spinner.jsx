import React from 'react';
import { Loader2 } from 'lucide-react';

const Spinner = ({ className = '' }) => {
  return <Loader2 className={`animate-spin ${className}`} />;
};

export default Spinner;