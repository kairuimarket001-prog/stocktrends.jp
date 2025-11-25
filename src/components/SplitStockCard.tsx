import { StockInfo, StockPrice } from '../types/stock';
import StockTrendSection from './StockTrendSection';
import StockDataGrid from './StockDataGrid';

interface SplitStockCardProps {
  info: StockInfo;
  latestPrice?: StockPrice;
}

export default function SplitStockCard({ info, latestPrice }: SplitStockCardProps) {
  const date = latestPrice?.date || info.timestamp;

  return (
    <div className="px-4 py-0">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-4">
          <div className="text-2xl font-black" style={{
            color: '#3c0800',
            fontFamily: 'HiraKakuPro-W3, Hiragino Kaku Gothic Pro, sans-serif'
          }}>
            {info.name}
          </div>
        </div>
        <div className="space-y-6">
          <StockTrendSection info={info} date={date} />
          <StockDataGrid info={info} latestPrice={latestPrice} />
        </div>
      </div>
    </div>
  );
}
