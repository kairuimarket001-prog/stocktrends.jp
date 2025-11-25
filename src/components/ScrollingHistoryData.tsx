import { StockPrice } from '../types/stock';
import { useState, useEffect, useRef } from 'react';

interface ScrollingHistoryDataProps {
  prices: StockPrice[];
  stockName: string;
}

const ITEM_HEIGHT = 85;
const ANIMATION_DURATION = 600;
const PAUSE_DURATION = 1500;

export default function ScrollingHistoryData({ prices, stockName }: ScrollingHistoryDataProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPlaceholderData = (): StockPrice[] => [
    {
      date: '取得中...',
      open: '---',
      high: '---',
      low: '---',
      close: '---',
      volume: '---',
      change: '0.0',
      changePercent: '0.00',
      per: 'N/A',
      pbr: 'N/A',
      dividend: 'N/A',
      code: '----',
    },
    {
      date: '取得中...',
      open: '---',
      high: '---',
      low: '---',
      close: '---',
      volume: '---',
      change: '0.0',
      changePercent: '0.00',
      per: 'N/A',
      pbr: 'N/A',
      dividend: 'N/A',
      code: '----',
    },
    {
      date: '取得中...',
      open: '---',
      high: '---',
      low: '---',
      close: '---',
      volume: '---',
      change: '0.0',
      changePercent: '0.00',
      per: 'N/A',
      pbr: 'N/A',
      dividend: 'N/A',
      code: '----',
    },
  ];

  const displayPrices = prices.length >= 3 ? prices : getPlaceholderData();
  const shouldAnimate = prices.length >= 3;

  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      setEnableTransition(true);
      setTranslateY(-ITEM_HEIGHT);

      setTimeout(() => {
        setEnableTransition(false);
        setTranslateY(0);
        setCurrentIndex((prev) => (prev + 1) % displayPrices.length);
      }, ANIMATION_DURATION);
    }, PAUSE_DURATION);

    return () => clearInterval(interval);
  }, [shouldAnimate, displayPrices.length]);

  const formatChange = (change: string, changePercent: string) => {
    const changeNum = parseFloat(change);
    const sign = changeNum >= 0 ? '+' : '';
    return `${sign}${change} (${changePercent}%)`;
  };

  const formatDate = (dateString: string) => {
    if (dateString === '取得中...') return dateString;
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const month = parts[1];
      const day = parts[2];
      return `${parseInt(month)}/${parseInt(day)}`;
    }
    return dateString;
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % displayPrices.length;
      items.push(displayPrices[index]);
    }
    return items;
  };

  const renderPriceItem = (price: StockPrice, index: number) => {
    const changeNum = parseFloat(price.change);
    const changeColor = changeNum >= 0 ? '#c6e48b' : '#ff6b6b';

    return (
      <div
        key={`${price.date}-${index}`}
        className="flex-shrink-0"
        style={{ height: `${ITEM_HEIGHT}px` }}
      >
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

  const visibleItems = getVisibleItems();

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

            <div
              className="absolute top-1/2 left-1/2 text-center"
              style={{
                width: '70%',
                height: `${ITEM_HEIGHT * 3}px`,
                transform: 'translate(-50%, -50%)',
                overflow: 'hidden'
              }}
            >
              <div
                ref={containerRef}
                style={{
                  transform: `translateY(${translateY}px)`,
                  transition: enableTransition ? `transform ${ANIMATION_DURATION}ms ease-in-out` : 'none',
                }}
              >
                {visibleItems.map((price, idx) => renderPriceItem(price, idx))}
              </div>
            </div>
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
