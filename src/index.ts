import './style.scss';

import { Suit, Card } from './pages/Card';
import { Deck } from './pages/Deck';
import { Hand, Score } from './pages/Hand';
import { UI } from './pages/UI';
import { UICard } from './pages/UICard';
import { Round } from './pages/Round';
import { Router } from './router';
import { GameView } from './pages/GameView';
import { RulesView } from './pages/RulesView';
import { ResultsView } from './pages/ResultsView';
import { Kinds } from './pages/Kinds';




const router = new Router();
router.setRoutes(
    [
        {
            path: '',
            page: RulesView,
        },
        {
            path: 'rules',
            page: RulesView,
        },
        {
            path: 'game',
            page: GameView,
        },
        {
            path: 'results',
            page: ResultsView,
        },

    ]);

router.start();






// const c = new Card(5, Suit.Diamonds);
// console.log(c);


// const d = new Deck();  //создаем колоду
// d.shuffle(); //тасуем карты
// console.log(d.draw().name); //достанем по имени 1 карту сл образом





// let k = new Kinds([
//     new Card(1, Suit.Diamonds),
//     new Card(1, Suit.Diamonds),
//     new Card(1, Suit.Diamonds),
//     new Card(1, Suit.Diamonds),
//     // new Card(1, Suit.Diamonds),

// ]);
// console.log(k);
// console.log(k.all(4));


// let k1 = new Kinds([
//     new Card(2, Suit.Diamonds),
//     new Card(2, Suit.Spades),
//     new Card(2, Suit.Spades),


//     new Card(1, Suit.Diamonds),
//     new Card(1, Suit.Clubs),
//     new Card(1, Suit.Clubs),

// ]);
// console.log(k1.all(3));
// console.log(k1.has(3));





// const h = new Hand([
//     new Card(3, Suit.Diamonds),
//     new Card(5, Suit.Diamonds),
//     new Card(6, Suit.Spades),
//     new Card(5, Suit.Diamonds),
//     new Card(6, Suit.Spades),

// ]);
// console.log(h);
// console.log(h.has(6));
// console.log(h.has(5, 9));
// console.log(h.getScore());


















