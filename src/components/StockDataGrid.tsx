import { StockInfo, StockPrice } from '../types/stock';

interface StockDataGridProps {
  info: StockInfo;
  latestPrice?: StockPrice;
}

export default function StockDataGrid({ info, latestPrice }: StockDataGridProps) {
  const dataItems = [
    { label: '始値', value: latestPrice?.open || info.price, color: '#16a34a' },
    { label: '高値', value: latestPrice?.high || info.price, color: '#16a34a' },
    { label: '安値', value: latestPrice?.low || info.price, color: '#16a34a' },
    { label: '終値', value: latestPrice?.close || info.price, color: '#16a34a' },
    { label: '売買高', value: latestPrice?.volume || 'N/A', color: '#16a34a' },
  ];

  return (
    <div className="w-full px-2 py-0 relative overflow-hidden">

      <div className="max-w-2xl mx-auto relative">
        <div className="flex flex-col gap-y-1">
          {[0, 1, 2].map((rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-2 gap-x-0">
              {dataItems.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, index) => (
                <div key={index} className="flex items-center gap-1 relative group">
                    <div className="text-base font-medium text-left" style={{ color: '#3c0800', minWidth: '3rem' }}>
                    {item.label}
                    </div>
                  <div className="text-lg font-bold text-left" style={{ color: item.color }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
