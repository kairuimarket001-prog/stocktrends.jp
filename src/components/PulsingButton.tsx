interface PulsingButtonProps {
  onClick: () => void;
  stockName?: string;
  disabled?: boolean;
}

export default function PulsingButton({ onClick, stockName = '', disabled = false }: PulsingButtonProps) {
  const buttonText = stockName ? `【${stockName}】の情報を表示` : '銘柄情報を表示';

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="flex justify-center px-4 my-3">
      <div className="max-w-lg w-full">
        <button
          onClick={handleClick}
          disabled={disabled}
          className="relative group disabled:opacity-50 disabled:cursor-not-allowed w-full transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div
            className="relative w-full h-24 flex items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom, #d4a574 0%, #c89557 20%, #b8823d 50%, #c89557 80%, #d4a574 100%)',
              borderRadius: '60px',
              border: '3px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
                borderRadius: '60px'
              }}
            />
            <div className="relative flex items-center justify-center px-8">
              <span className="font-bold text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{buttonText}</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
