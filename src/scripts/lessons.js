// import Bunny from './scripts/bunny';

export default class Lesson {

  constructor(game, bunny) {
    this.currentLessonNum = 0;
    this.longDirections = '';
    this.form = ``;
    this.taskBar = '';
    this.info = '';
    this.game = game;
    this.bunny = bunny;
    this.target = '';
  }

  lessonComplete(event) {
    if (event) event.preventDefault();
    this.currentLessonNum += 1;
    this.game.runLesson();
  }

  displayLessons() {
    const infoList = document.getElementById('info-learned');
    infoList.innerHTML = '';
    this.game.info.forEach(info => {
      infoList.innerHTML += `<li>${info}</li>`
    })
  }

  lesson0(){
    this.longDirections = `You added hay to the pile! You can move ${this.bunny.name} around with your cursor or the arrow keys. Trying moving ${this.bunny.name} to the litterbox.`;
    this.form = `<input type="submit" value='Continue'>`;
    this.taskBar = `Move ${this.bunny.name} to the litterbox.`;
    this.info = `Bunnies can be trained to use the litterbox just like cats.`;
    this.target = 'litter box';
  }
  
  
  lesson1() {
    this.longDirections = `Bunnies eat hay all day. Keep an eye on the hay pile and refill it often. ${this.bunny.name} will lose hearts if the hay is gone.`;
    this.form = `<input type="submit" value='Continue'>`;
    this.taskBar = `Click on the 'Add Hay' button to refill the rabbit's hay.`;
    this.info = `Bunnies need to have access to hay 24/7. This should be the main part of their diet.`;
    this.target = '';

    const addHay = document.getElementById('add-hay');
    this.lessonCompleteBinded = this.lessonComplete.bind(this);
    addHay.addEventListener('click', this.lessonCompleteBinded);
      
  }


  lesson2() {
    const addHay = document.getElementById('add-hay');
    addHay.removeEventListener('click', this.lessonCompleteBinded);
    this.longDirections = `It's mealtime! ${this.bunny.name} would like to eat some fresh veggies. Which items would you like to feed ${this.bunny.name}?`;
    this.form = `<input type='checkbox' id='leeks' name='vegetables' required> <label for='leeks'>Leeks</label>
    
    <input type='checkbox' id='tomato-leaf' name='vegetables'> <label for='tomato-leaf'>Tomato Leaf</label>
    
    <input type='checkbox' id='cilantro' name='vegetables'> <label for='cilantro'>Cilantro</label>
    
    <input type='checkbox' id='iceberg' name='vegetables'> <label for='iceberg'>Iceberg Lettuce</label>

    <input type='checkbox' id='carrot-leaf' name='vegetables' required> <label for='carrot-leaf'>Carrot Leaf</label><br>
    
    <input type="submit" value='Feed Vegetables'>`;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }
  
  
  lesson3() {
    this.longDirections = `Oh no. ${this.bunny.name} has been peeing around the home. It turns out she wasn't spayed. If you would like to spay ${this.bunny.name} click the spay button at any time. This procedure will cost $200 and prevent you from playing with ${this.bunny.name} for 120 seconds.`;
    this.form = ``;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
    
  }
  
  lesson4() {
    this.longDirections = ``;
    this.form = ``;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }
  
  lesson5() {
    this.longDirections = `Oh no. ${this.bunny.name} got dirty.How do you want to clean ${this.bunny.name}?`;
    this.form = 
    `<input type='radio' id='bath' name='clean-method' required> <label for='bath'>Bathe ${this.bunny.name}.</label>
    <input type='radio' id='wipe' name='clean-method'> <label for='wipe'>Wipe ${this.bunny.name}.</label><input type="submit" value='Choose'>`;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }
  
  lesson6() {
    this.longDirections = ``;
    // this.form = ``;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }
 

  lesson7() {
    this.longDirections = ``;
    this.form = ``;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }

  lesson8() {
    this.longDirections = `${this.name} is bored and would like to go outside. Would you like to allow ${this.name} to go outside to play?`;
    this.form = ``;
    this.taskBar = ``;
    this.info = `House bunnies should be kept indoors. When outside bunnies are exposed to diseases and predators.`
    this.target = `door`;
  }

  lesson9() {
    this.longDirections = ``;
    this.form = ``;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }

  lesson10() {
    this.longDirections = ``;
    this.form = ``;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }

  lesson11() {
    this.longDirections = ``;
    this.form = ``;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }

  adoptAFriend() {
    this.prompt = `Congratuations! You have made ${this.bunny.name} super happy. As you have become a good pet owner, would you like to adopt a friend for ${this.bunny.name}.`
  }

}