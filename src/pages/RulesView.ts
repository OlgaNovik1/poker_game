import { AbstractPage } from "../router";
import image from "/src/images/Poker_Hand_Ranking_1200x400_5ab7321c40.jpg";



const catalogTemplate = document.createElement('template');


catalogTemplate.innerHTML =
    ` 
<img src="${image}" class="description" alt="foto">


<div class="text">
<p class="rules">
    Royal Flush - the hand consisting of the cards A, K, Q, J, 10, of the same suit. This is the rarest and strongest hand in poker.    
</p>
<p class="rules">
    A straight flush is a hand that contains five cards of sequential rank, all of the same suit, such as Q♥ J♥ 10♥ 9♥ 8♥ (a "queen-high straight flush").
     It ranks below five of a kind and above four of a kind. Under high rules, an ace can rank either high (as in A♥ K♥ Q♥ J♥ 10♥, an ace-high straight flush) or low (as in 5♦ 4♦ 3♦ 2♦ A♦, a five-high straight flush), but cannot simultaneously rank both high and low (so Q♣ K♣ A♣ 2♣ 3♣ is an ace-high flush, but not a straight).Under deuce-to-seven low rules, an ace always ranks high (so 5♠ 4♠ 3♠ 2♠ A♠ is an ace-high flush). Under ace-to-six low rules, an ace always rank low (so A♥ K♥ Q♥ J♥ 10♥ is a king-high flush). Under ace-to-five low rules, straight flushes are not possible (so 9♣ 8♣ 7♣ 6♣ 5♣ is a nine-high hand).
</p>
<p class="rules">
    Four of a kind, also known as quads, is a hand that contains four cards of one rank and one card of another rank (the kicker), such as 9♣ 9♠ 9♦ 9♥ J♥ ("four of a kind, nines"). It ranks below a straight flush and above a full house.
</p>
<p class="rules">
    A full house, also known as a full boat or a tight or a boat (and originally called a full hand), is a hand that contains three cards of one rank and two cards of another rank, such as 3♣ 3♠ 3♦ 6♣ 6♥ (a "full house, threes over sixes" or "threes full of sixes" or "threes full"). It ranks below four of a kind and above a flush.
</p>
<p class="rules">
    A flush is a hand that contains five cards all of the same suit, not all of sequential rank, such as K♣ 10♣ 7♣ 6♣ 4♣ (a "king-high flush" or a "king-ten-high flush"). It ranks below a full house and above a straight. Under ace-to-five low rules, flushes are not possible (so J♥ 8♥ 4♥ 3♥ 2♥ is a jack-high hand).
</p>
<p class="rules">
    A straight is a hand that contains five cards of sequential rank, not all of the same suit, such as 7♣ 6♠ 5♠ 4♥ 3♥ (a "seven-high straight"). It ranks below a flush and above three of a kind.[5] Under high rules, an ace can rank either high (as in A♦ K♣ Q♣ J♦ 10♠, an ace-high straight) or low (as in 5♣ 4♦ 3♥ 2♥ A♠, a five-high straight), but cannot simultaneously rank both high and low.
</p>
<p class="rules">
    Three of a kind, also known as trips or a set, is a hand that contains three cards of one rank and two cards of two other ranks (the kickers), such as 2♦ 2♠ 2♣ K♠ 6♥ ("three of a kind, twos" or "trip twos" or a "set of twos"). It ranks below a straight and above two pair.
</p>
<p class="rules">
    Two pair is a hand that contains two cards of one rank, two cards of another rank and one card of a third rank (the kicker), such as J♥ J♣ 4♣ 4♠ 9♥ ("two pair, jacks and fours" or "two pair, jacks over fours" or "jacks up"). It ranks below three of a kind and above one pair.
</p>
<p class="rules">
    One pair - 'Jacks or Better', or simply a pair, is a hand that contains two cards of one rank and three cards of three other ranks (the kickers).
</p>
<p class="rules">
    High card, also known as no pair or simply nothing, is a hand that does not fall into any other category, such as K♥ J♥ 8♣ 7♦ 4♠ ("high card, king" or "king-jack-high" or "king-high"). Note that under ace-to-five low rules, straights, flushes and straight flushes are not possible, so such hands are instead high card hands.It ranks below one pair.
</p>
</div>

`;




export class RulesView extends AbstractPage {

    destroy(): void {
    }

    render(): DocumentFragment {

        return catalogTemplate.content.cloneNode(true) as DocumentFragment;
    }
}



