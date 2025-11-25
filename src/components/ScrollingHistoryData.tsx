import { StockPrice } from '../types/stock';
import { useState, useEffect } from 'react';

interface ScrollingHistoryDataProps {
  prices: StockPrice[];
  stockName: string;
}

export default function ScrollingHistoryData({ prices, stockName }: ScrollingHistoryDataProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (prices.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % prices.length);
        setIsAnimating(false);
      }, 800);
    }, 3000);

    return () => clearInterval(interval);
  }, [prices.length]);

  if (prices.length === 0) {
    return null;
  }

  // 获取当前显示的3个条目
  const visiblePrices = [
    prices[currentIndex % prices.length],
    prices[(currentIndex + 1) % prices.length],
    prices[(currentIndex + 2) % prices.length]
  ];

  // 获取下一组的3个条目（用于动画）
  const nextPrices = [
    prices[(currentIndex + 1) % prices.length],
    prices[(currentIndex + 2) % prices.length],
    prices[(currentIndex + 3) % prices.length]
  ];

  const formatChange = (change: string, changePercent: string) => {
    const changeNum = parseFloat(change);
    const sign = changeNum >= 0 ? '+' : '';
    return `${sign}${change} (${changePercent}%)`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const renderPriceItem = (price: StockPrice, index: number) => {
    const changeNum = parseFloat(price.change);
    const changeColor = changeNum >= 0 ? '#c6e48b' : '#ff6b6b';

    return (
      <div key={`${price.date}-${index}`} className="mb-3 last:mb-0">
        <div className="text-white font-bold text-base mb-0.5">
          株-{price.code || stockName.slice(0, 4)} {formatDate(price.date)}
        </div>
        <div className="text-xs" style={{ color: changeColor }}>
          <span className="font-medium text-white">終値：</span>
          <span className="font-bold">{price.close}</span>
        </div>
        <div className="text-xs" style={{ color: changeColor }}>
          <span className="font-medium text-white">前日比：</span>
          <span className="font-bold">{formatChange(price.change, price.changePercent)}</span>
        </div>
      </div>
    );
  };

  const renderGroup = (priceGroup: StockPrice[], position: 'current' | 'next') => {
    const baseStyle = {
      width: '70%',
      transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out'
    };

    const positionStyle = position === 'current'
      ? (isAnimating
          ? { transform: 'translate(-50%, -150%)', opacity: 0 }
          : { transform: 'translate(-50%, -50%)', opacity: 1 })
      : (isAnimating
          ? { transform: 'translate(-50%, -50%)', opacity: 1 }
          : { transform: 'translate(-50%, 50%)', opacity: 0 });

    return (
      <div
        className="absolute top-1/2 left-1/2 text-center"
        style={{ ...baseStyle, ...positionStyle }}
      >
        {priceGroup.map((price, idx) => renderPriceItem(price, idx))}
      </div>
    );
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-lg mx-auto">
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: '120%' }}>
          <div className="absolute inset-0">
            <img
              src="/stock.png"
              alt="Stock background"
              className="w-full h-full object-contain"
            />

            <div className="absolute top-[3%] left-[3%] w-[15%] h-[15%]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#8B4513" opacity="0.8"/>
                <circle cx="50" cy="50" r="35" fill="#D2691E" opacity="0.6"/>
                <circle cx="50" cy="50" r="25" fill="#FFD700" opacity="0.4"/>
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}
                    y2={50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}
                    stroke="#FFD700"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>

            <div className="absolute bottom-[3%] right-[3%] w-[15%] h-[15%]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#8B4513" opacity="0.8"/>
                <circle cx="50" cy="50" r="35" fill="#D2691E" opacity="0.6"/>
                <circle cx="50" cy="50" r="25" fill="#FFD700" opacity="0.4"/>
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}
                    y2={50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}
                    stroke="#FFD700"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>

            {renderGroup(visiblePrices, 'current')}
            {prices.length > 1 && renderGroup(nextPrices, 'next')}
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-red-900 font-bold">
            データ出典: 公開市場情報 | 更新: 準リアルタイム
          </p>
          <p className="text-xs text-red-900 font-bold mt-1">
            ※過去のデータは将来の結果を保証するものではありません
          </p>
        </div>
      </div>
    </div>
  );
}
