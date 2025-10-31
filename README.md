Интерактивный компонент временной шкалы с круговой навигацией и слайдером событий, реализованный с использованием React, TypeScript, SCSS, Webpack, Swiper и GSAP.

- **Круговая навигация**: От 2 до 6 временных периодов, расположенных равномерно по кругу
- **Плавные анимации**: Переходы между периодами с использованием GSAP
- **Слайдер событий**: Swiper-слайдер с детальной информацией о событиях
- **Независимые компоненты**: Модульная архитектура позволяет размещать несколько экземпляров на странице
- **Адаптивный дизайн**: Оптимизирован для всех размеров экранов
- **Доступность**: Поддержка клавиатурной навигации и ARIA-атрибутов

2. **Зависимости**
npm install
3. **запуск в ркжиме разработки**
npm start
Проект автоматически откроется в браузере по адресу `http://localhost:3000`
4. **Сборка для продакшена**
npm run build

Готовые файлы будут в папке `dist/`

## 📁 Структура проекта

```
Test2/
├── src/
│   ├── components/
│   │   ├── CircleNavigation/
│   │   │   ├── CircleNavigation.tsx
│   │   │   └── CircleNavigation.scss
│   │   ├── EventsSlider/
│   │   │   ├── EventsSlider.tsx
│   │   │   └── EventsSlider.scss
│   │   └── HistoricalTimeline/
│   │       ├── HistoricalTimeline.tsx
│   │       └── HistoricalTimeline.scss
│   ├── styles/
│   │   ├── _variables.scss
│   │   └── main.scss
│   ├── types/
│   │   └── timeline.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.html
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

