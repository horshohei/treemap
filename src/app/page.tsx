import React from 'react';
import TreeMap from '@/components/TreeMap';

const data = [
  { title: "埼玉", volume: 24, contents: ["大宮", "浦和", "与野"], class: "kanto" },
  { title: "東京", volume: 28, contents: ["千代田", "台東"], class: "kanto" },
  { title: "北海道", volume: 23, contents: ["札幌","厚岸"], class: "hokkaido" },
  { title: "大阪", volume: 12, contents: ["羽曳野","岸和田"], class: "kinki" },
  { title: "福岡", volume: 43, contents: ["博多", "大牟田"], class: "kyushu" },
    { title: "愛知", volume: 23, contents: ["名古屋", "豊橋"], class: "chubu" },
    { title: "広島", volume: 32, contents: ["広島", "福山"], class: "chugoku" },
    { title: "香川", volume: 44, contents: ["高松", "丸亀"], class: "shikoku" },
    { title: "岩手", volume: 8, contents: ["盛岡", "奥州"], class: "tohoku" },
  { title: "神奈川", volume: 20, contents: ["横浜", "川崎"], class: "kanto" },
  {title: "栃木", volume: 12, contents: ["宇都宮", "小山"], class: "kanto"},
  {title: "群馬", volume: 13, contents: ["前橋", "高崎"], class: "kanto"},
  {title: "長野", volume: 14, contents: ["長野", "松本"], class: "chubu"},
    {title: "山梨", volume: 11, contents: ["甲府", "中央"], class: "chubu"},

];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">ツリーマップUIテスト</h1>
      <TreeMap data={data} />
    </div>
  );
};

export default Home;
