import React from 'react';
import HistoricalTimeline from './components/HistoricalTimeline/HistoricalTimeline';
import { TimelineData } from './types/timeline';

const timelineData: TimelineData = {
  periods: [
    {
      id: 1,
      category: 'Технологии',
      startYear: 1980,
      endYear: 1986,
      events: [
        { year: 1980, description: 'Sinclair Research выпускает домашний компьютер ZX80' },
        { year: 1981, description: 'IBM выпускает первый персональный компьютер' },
        { year: 1982, description: 'Появление протокола TCP/IP' },
        { year: 1983, description: 'Компания Apple представляет компьютер Lisa' },
        { year: 1984, description: 'Выход компьютера Macintosh от Apple' },
        { year: 1985, description: 'Microsoft выпускает Windows 1.0' },
        { year: 1986, description: 'Началась разработка Perl' },
      ],
    },
    {
      id: 2,
      category: 'Кино',
      startYear: 1987,
      endYear: 1991,
      events: [
        { year: 1987, description: 'Премьера фильма "Хищник" с Арнольдом Шварценеггером' },
        { year: 1988, description: 'Выход мультфильма "Кто подставил кролика Роджера"' },
        { year: 1989, description: 'Премьера фильма "Бэтмен" Тима Бертона' },
        { year: 1990, description: 'Выход фильма "Один дома"' },
        { year: 1991, description: 'Премьера фильма "Терминатор 2: Судный день"' },
      ],
    },
    {
      id: 3,
      category: 'Литература',
      startYear: 1992,
      endYear: 1997,
      events: [
        { year: 1992, description: 'Выход романа "Хребты безумия" на русском языке' },
        { year: 1993, description: 'Публикация "Берегись автомобиля" Михаила Веллера' },
        { year: 1994, description: 'Выход романа "Портрет" Александры Марининой' },
        { year: 1995, description: 'Издание "Парка Юрского периода" на русском' },
        { year: 1997, description: 'Первая книга о Гарри Поттере' },
      ],
    },
    {
      id: 4,
      category: 'Театр',
      startYear: 1999,
      endYear: 2004,
      events: [
        { year: 1999, description: 'Премьера спектакля "Гамлет" в МХТ им. Чехова' },
        { year: 2000, description: 'Открытие нового здания Мариинского театра' },
        { year: 2002, description: 'Спектакль "Чайка" в Театре Наций' },
        { year: 2003, description: 'Премьера "Ромео и Джульетта" в современной интерпретации' },
        { year: 2004, description: 'Открытие Театра на Таганке после реконструкции' },
      ],
    },
    {
      id: 5,
      category: 'Наука',
      startYear: 2006,
      endYear: 2014,
      events: [
        { year: 2006, description: 'Плутон лишен статуса планеты' },
        { year: 2008, description: 'Запуск Большого адронного коллайдера' },
        { year: 2010, description: 'Создание первого синтетического организма' },
        { year: 2012, description: 'Обнаружение бозона Хиггса' },
        { year: 2013, description: 'Запуск космического телескопа Gaia' },
        { year: 2014, description: 'Первая успешная посадка на комету' },
      ],
    },
    {
      id: 6,
      category: 'Спорт',
      startYear: 2015,
      endYear: 2022,
      events: [
        { year: 2015, description: 'Первый Чемпионат Европы по киберспорту' },
        { year: 2016, description: 'Летние Олимпийские игры в Рио-де-Жанейро' },
        { year: 2018, description: 'Чемпионат мира по футболу в России' },
        { year: 2020, description: 'Перенос Олимпийских игр в Токио' },
        { year: 2021, description: 'Олимпийские игры в Токио' },
        { year: 2022, description: 'Зимние Олимпийские игры в Пекине' },
      ],
    },
  ],
};

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <h1 className="main-title">Исторические даты</h1>
        <HistoricalTimeline data={timelineData} />
      </div>
    </div>
  );
};

export default App;

