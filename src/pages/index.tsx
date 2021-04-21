import Head from 'next/head';
import Button from '@/components/Button';
import { useState } from 'react';
import _ from 'lodash';

const randoms = [
  'Abraham Auzan',
  'dr. Ari',
  'Fitriyana',
  'Mbak Anda',
  'Abigail',
  'Adelia',
  'Dina',
  'Bella',
  'Dondi',
  'Uli',
  'Edi',
  'Erna',
  'Fajar',
  'Fitri',
  'Hindy',
  'Aga',
  'Lia',
  'Rachmat',
  'Ray',
  'Restu A',
  'Restu M',
  'Reza',
  'Ridwin',
  'Riva',
  'Ryana',
  'Santi',
  'Tutik',
  'Iyus',
  'Wieske',
  'Dimas',
  'Arief',
  'Riska',
  'Arimbi',
  'Marisca',
];
const FORCE_LOCAL_STORAGE = false;

const Index = () => {
  const [isRandomize, setIsRandomize] = useState(false);
  const [name, setName] = useState('');
  const [names, setNames] = useState(randoms);
  const [chosenNames, setChosenNames] = useState([]);
  const [myInterval, setMyInterval] = useState();

  const chooseOne = () => {
    if (isRandomize) {
      setIsRandomize(false);

      clearInterval(myInterval);

      // Subtract name from array
      const tmpNames = Object.assign([], names);
      _.remove(tmpNames, (n) => {
        return n === name;
      });
      setNames(tmpNames);
      localStorage.setItem('availableNames', JSON.stringify(tmpNames));

      // Add to chosen Names
      const tmpChosenNames = Object.assign([], chosenNames);
      tmpChosenNames.push(name);
      setChosenNames(tmpChosenNames);
      localStorage.setItem('chosenNames', JSON.stringify(tmpChosenNames));
    } else {
      setIsRandomize(true);

      let timeout = setInterval(() => {
        let availableNames;

        if (FORCE_LOCAL_STORAGE) {
          availableNames = JSON.parse(localStorage.getItem('availableNames'));
        } else {
          availableNames = names;
        }

        let chosenOne = availableNames[
          Math.floor(Math.random() * names.length)
        ].toString();
        setName(chosenOne);
      }, 10);

      // @ts-ignore
      setMyInterval(timeout);
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setChosenNames([]);
    setNames(randoms);
  };

  return (
    <div className="container mx-auto ">
      <div className="flex flex-wrap my-32 content-center text-center">
        <div className="w-full text-xl">
          {name === '' ? (
            <h1 className="text-9xl text-gray-600 font-sans">Siap-siap</h1>
          ) : (
            <h1 className="text-9xl text-gray-600 font-mono">{name}</h1>
          )}
        </div>
      </div>

      <div className="flex flex-wrap content-center text-center">
        <div className="w-full">
          <Button onClick={chooseOne}>
            {isRandomize ? `Berhenti` : `Acak`}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full">
          {chosenNames.length > 0 && (
            <>
              <table className="text-left border-collapse">
                <thead>
                  <tr>
                    <th>Yang Terpilih</th>
                  </tr>
                </thead>

                <tbody>
                  {FORCE_LOCAL_STORAGE ? (
                    <>
                      {JSON.parse(localStorage.getItem('chosenNames')).map(
                        (item, idx) => {
                          return (
                            <tr key={idx.toString()}>
                              <td>
                                {(idx + 1).toString()}. {item}
                              </td>
                            </tr>
                          );
                        },
                      )}
                    </>
                  ) : (
                    <>
                      {chosenNames.map((item, idx) => {
                        return (
                          <tr key={idx.toString()}>
                            <td>
                              {(idx + 1).toString()}. {item}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap content-center text-center">
        <div className="w-full">
          <a href="/#" onClick={reset} className="inline-block text-sm">
            Reset
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
