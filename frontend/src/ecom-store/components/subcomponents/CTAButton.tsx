import React from 'react';
import classNames from 'classnames';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;  // Dynamically passed className
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick, type = 'button', disabled = false, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'font-poppins px-6 py-3 rounded-md transition duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed',
        className // Add dynamic className
      )}
    >
      {text}
    </button>
  );
};

export default CTAButton;
