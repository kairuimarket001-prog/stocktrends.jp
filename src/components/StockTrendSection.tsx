import { StockInfo } from '../types/stock';

interface StockTrendSectionProps {
  info: StockInfo;
  date: string;
}

export default function StockTrendSection({ info, date }: StockTrendSectionProps) {
  const changeNum = parseFloat(info.change);
  const isPositive = changeNum >= 0;

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{
      backgroundImage: 'url(/redis.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '240px',
      padding: '20px'
    }}>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-start" style={{ marginTop: '60px', marginLeft: '10px' }}>
          <div className="relative">
            <img src="/top.png" alt="Price Display" className="h-24" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: '8px', paddingLeft: '10px' }}>
              <div className="text-2xl font-black text-red-600" style={{ lineHeight: '1' }}>
                {info.price}
              </div>
              <div className="text-sm font-bold text-red-600 mt-1 mb-2">
                {info.change} ({info.changePercent})
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 right-3 text-right">
          <div className="text-2xl font-black" style={{ color: '#3c0800', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            ({info.code})
          </div>
          <div className="text-xl font-bold" style={{ color: '#3c0800', marginTop: '2px', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)', fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif' }}>
            {date}
          </div>
        </div>
      </div>

    </div>
  );
}
