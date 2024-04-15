import React from "react";
import choko from "../../asset/images/choko.jpg";
import moka from "../../asset/images/moka.jpg";
import navi from "../../asset/images/navi.jpg";
import ddongyi from "../../asset/images/ddongyi.jpg";

const pets = [
  { id: 1, name: "초코", age: 2, gender: "수컷", image: choko },
  { id: 2, name: "나비", age: 3, gender: "암컷", image: navi },
  { id: 3, name: "모카", age: 1, gender: "수컷", image: moka },
  { id: 4, name: "뚱이", age: 3, gender: "암컷", image: ddongyi },
];

const PetCard = ({ pet }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
      <img
        style={{ height: "300px", width: "300px", objectFit: "cover" }}
        src={pet.image}
        alt={pet.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{pet.name}</div>
        <p className="text-gray-700 text-base">나이: {pet.age}세</p>
        <p className="text-gray-700 text-base">성별: {pet.gender}</p>
      </div>
    </div>
  );
};

const Introduction = () => {
  return (
    <div className="py-8">
      <div className="text-center text-4xl font-bold mb-6">
        당신을 기다리고 있는 천사들
      </div>
      <div className="flex flex-row justify-center gap-4 overflow-auto">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg cursor-pointer">
          더보기
        </button>
      </div>
    </div>
  );
};

export default Introduction;
