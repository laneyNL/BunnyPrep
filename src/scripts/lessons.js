// import Bunny from './scripts/bunny';

export default class Lesson {

  constructor(game, bunny) {
    this.currentLessonNum = 4;
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
    console.log('lesscom', this.currentLessonNum);
    this.game.budget += 5;
    this.currentLessonNum += 1;
    this.game.runLesson();
    console.log('ran lesscom', this.currentLessonNum);
  }

  displayLessons() {
    const infoList = document.getElementById('info-learned');
    infoList.innerHTML = '';
    this.game.info.forEach(info => {
      infoList.innerHTML += `<li>${info}</li>`
    })
  }

  lesson0(){
    this.longDirections = `You can move ${this.bunny.name} around with your cursor or the arrow keys. Trying moving ${this.bunny.name} to the litterbox.`;
    this.form = `<input type="submit" value='Continue'>`;
    this.taskBar = `Move ${this.bunny.name} to the litterbox.`;
    this.info = `Bunnies can be trained to use the litterbox just like cats.`;
    this.target = 'litter box';
  }
  
  
  lesson1() {
    this.longDirections = `You have moved ${this.bunny.name} to the litter box! Bunnies eat hay all day. Keep an eye on the hay pile and refill it often. Each refill will cost $5. ${this.bunny.name} will lose hearts if the hay is gone. Try clicking 'Add Hay' button.`;
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

    this.longDirections = `Great job on adding hay! Now it's time to feed ${this.bunny.name} some fresh veggies. Select which items would you like to feed ${this.bunny.name}. Each vegetable will cost $1. Afterwards, move ${this.bunny.name} to the food bowl`;
    this.form = `<input type='checkbox' id='leeks' name='vegetables'> <label for='leeks'>Leeks</label><br>
    
    <input type='checkbox' id='tomato-leaf' name='vegetables'> <label for='tomato-leaf'>Tomato Leaf</label><br>
    
    <input type='checkbox' id='cilantro' name='vegetables'> <label for='cilantro'>Cilantro</label><br>
    
    <input type='checkbox' id='iceberg' name='vegetables'> <label for='iceberg'>Iceberg Lettuce</label><br>

    <input type='checkbox' id='blackberry-leaf' name='vegetables'> <label for='blackberry-leaf'>Blackberry Leaf</label><br>
    
    <input type='checkbox' id='basil' name='vegetables'> <label for='basil'>Basil</label><br>

    <input type="submit" value='Feed Vegetables'>`;
    this.taskBar = `Select the vegetables and move ${this.bunny.name} to the food bowl.`;
    this.info = `Not all vegetables are safe for bunnies to eat.`;
    this.target = 'food-bowl';
  }

  
  lesson3() {
    let userBadVegs = this.bunny.checkVegetables();
    this.longDirections = ``;
    if (userBadVegs.length <= 0) {
      this.longDirections = `Nom nom nom. ${this.bunny.name} is super happy.`;
    } else {
      this.longDirections = `Oh no! ${this.bunny.name} was fed some dangerous vegetables.`;
      if (userBadVegs.includes('leeks')) this.longDirections += `<br>Vegetables in the onion family including leeks are poisionous to bunnies.`;
      if (userBadVegs.includes('tomato-leaf')) this.longDirections += `<br>Tomato leaves are toxic to bunnies.`;
      if (userBadVegs.includes('iceberg')) this.longDirections += `<br>Iceberg lettuce can have toxins that are dangerous to bunnies. Feeding darker leaf lettuces are better.`;
    }
    this.longDirections += `<br>Bring ${this.bunny.name} to the water bowl to get some water.`
    this.form = `<input type="submit" value='Continue'>`;
    this.taskBar = `Move ${this.bunny.name} to the water bowl.`;
    this.info = `Research before introducing a new vegetable.`;
    this.target = `water`;
  }
  
  lesson4() {
    this.game.question.innerHTML = this.longDirections = `The shelter has contacted you to ask if you would like to adopt another bunny. However ${this.bunny.name} is not spayed. Each option is $200. Would you like to adopt another bunny or spay ${this.bunny.name}?`;
    this.form = `<input type="radio" name="AdOrSp" id="adopt" required><label id="adopt">Adopt</label>
    <input type="radio" name="AdOrSp" id="spay"><label id="spay">Spay</label>
    <input type="submit" name="AdOrSp" value="Decide">`;
    this.game.form.classList.replace('input-form', 'adOrSp');
    this.taskBar = `After deciding, bring ${this.bunny.name} to the couch to wait.`;
    this.info = ``;
    this.target = `couch`;
  }
  
  lesson5() {
    this.longDirections = `Congrats on spaying ${this.bunny.name}! `;
    this.form = `<input type="submit" value='Continue'>`;
    this.taskBar = `${this.bunny.name} will need to rest in order to recover.`;
    this.info = `Spaying/Neutering your bunny will help reduce risk of cancer and can help with behavioral problems.`;
    this.target = ``;
  }
  
  lesson30() {
    this.longDirections = `You have chosen to adopt a friend. Please name and select which friend you would like.`;
    this.form = `<label for='input-text'>Name</label>
      <input type="text" id ='input-text' name='bunny-name' required><br>

      <input type='radio' id='brown-bunny' name='bunny-color' required>
      <label for='brown-bunny'><img src="./images/brown/brown_happy.png" alt="brown bunny pictures" class='bunny-image'></label>

      <input type='radio' id='grey-bunny' name='bunny-color'>
      <label for='grey-bunny'><img src="./images/grey/grey_happy.png" alt="grey bunny pictures" class='bunny-image'></label>

      <input type='radio' id='black-bunny' name='bunny-color'>
      <label for='black-bunny'><img src="./images/black/black_happy.png" alt="black bunny pictures" class='bunny-image'></label><br>

      <input type="submit" value='Play Game'>`;
      this.game.form.classList.replace('adOrSp', 'adopt');
      this.taskBar = `Choose a bunny to adopt.`;
      this.info = ``;
      this.target = ``;
    }
    
    lesson31() {
      this.longDirections = `It turns out ${this.bunny.name} and the new bunny did not get along. The shelter gave you the bunny that got along best with yours.`;
      this.form = ``;
      this.taskBar = ``;
      this.info = `When getting another bunny, the 1st bunny will choose who they want to bond with.`;
      this.target = ``;
    }

  lesson31() {
    this.longDirections = `Oh no. ${this.bunny.name} got dirty.How do you want to clean ${this.bunny.name}?`;
    this.form =
      `<input type='radio' id='bath' name='clean-method' required> <label for='bath'>Bathe ${this.bunny.name}.</label>
    <input type='radio' id='wipe' name='clean-method'> <label for='wipe'>Wipe ${this.bunny.name}.</label><input type="submit" value='Choose'>`;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }

  lesson6() {
    this.longDirections = `Oh no. ${this.bunny.name} got dirty.How do you want to clean ${this.bunny.name}?`;
    this.form =
      `<input type='radio' id='bath' name='clean-method' required> <label for='bath'>Bathe ${this.bunny.name}.</label>
    <input type='radio' id='wipe' name='clean-method'> <label for='wipe'>Wipe ${this.bunny.name}.</label><input type="submit" value='Choose'>`;
    this.taskBar = ``;
    this.info = ``;
    this.target = ``;
  }

  lesson7() {
    this.longDirections = `${this.name} is bored and would like to go outside. Would you like to allow ${this.name} to go outside to play?`;
    this.form = ``;
    this.taskBar = ``;
    this.info = `House bunnies should be kept indoors. When outside bunnies are exposed to diseases and predators.`
    this.target = `door`;
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

}