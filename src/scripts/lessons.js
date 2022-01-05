// import Bunny from './scripts/bunny';

export default class Lesson {

  constructor(game, bunny) {
    this.currentLessonNum = 0;
    this.taskBar = '';
    this.info = '';
    this.game = game;
    this.bunny = bunny;
    this.name = this.bunny.name;
    this.target = '';
  }

  lessonComplete(event) {
    if (event) event.preventDefault(); 
    this.game.budget += 5;
    this.bunny.happyMeter += 1;
    this.currentLessonNum += 1;
    this.game.runLesson();
  }

  displayLessons() {
    const infoList = document.getElementById('info-learned');
    infoList.innerHTML = '';
    this.game.info.forEach(info => {
      infoList.innerHTML += `<li>${info}</li>`
    })
    if (this.currentLessonNum === 2) this.game.room.drawLeaf();
    if (this.currentLessonNum === 5) this.game.room.drawDroppings();
  }

  lesson0(){
    this.game.question.innerHTML = `You can move ${this.name} around with your cursor or the arrow keys. Trying moving ${this.name} to the litterbox. Earn hearts and money by completing tasks.`;
    this.game.form.innerHTML = `<input type="submit" value='Continue'>`;
    this.taskBar = `Move ${this.name} to the litterbox.`;
    this.info = `Bunnies can be trained to use the litterbox just like cats.`;
    this.target = 'litter box';
  }
  
  
  lesson1() {
    this.game.question.innerHTML = `You have moved ${this.name} to the litter box! <br>Bunnies eat hay all day. Keep an eye on the hay pile and refill it often. Each refill will cost $5. ${this.name} will lose hearts if the hay is gone. <br>Try clicking 'Add Hay' button.`;
    this.game.form.innerHTML = `<input type="submit" value='Continue'>`;
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

    this.game.question.innerHTML = `Great job on adding hay! <br>Now it's time to feed ${this.name} some fresh veggies. Select which items would you like to feed ${this.name}. Each vegetable will cost $1. <br>Afterwards, move ${this.name} to the food bowl`;
    this.game.form.innerHTML = `<input type='checkbox' id='leeks' name='vegetables'> <label for='leeks'>Leeks</label><br>
    
    <input type='checkbox' id='tomato-leaf' name='vegetables'> <label for='tomato-leaf'>Tomato Leaf</label><br>
    
    <input type='checkbox' id='cilantro' name='vegetables'> <label for='cilantro'>Cilantro</label><br>
    
    <input type='checkbox' id='iceberg' name='vegetables'> <label for='iceberg'>Iceberg Lettuce</label><br>

    <input type='checkbox' id='blackberry-leaf' name='vegetables'> <label for='blackberry-leaf'>Blackberry Leaf</label><br>
    
    <input type='checkbox' id='basil' name='vegetables'> <label for='basil'>Basil</label><br>

    <input type="submit" value='Feed Vegetables'>`;
    this.taskBar = `Select the vegetables and move ${this.name} to the food bowl.`;
    this.info = `Not all vegetables are safe for bunnies to eat.`;
    this.target = 'food-bowl';
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(box => {
      box.addEventListener('change', () => {
        this.requireInputCheck();
      });
    })
    this.requireInputCheck();
  }

  requireInputCheck() {
    let errMsg = '';
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    if (this.game.checkboxInput().length === 0) errMsg = 'Must select at least one option.';
    checkboxes[0].setCustomValidity(errMsg);
  }

  lesson3() {
    let userBadVegs = this.bunny.checkVegetables();
    if (userBadVegs.length <= 0) {
      this.game.question.innerHTML = `Nom nom nom. ${this.name} is super happy.`;
    } else {
      this.game.question.innerHTML = `Oh no! ${this.name} was fed some dangerous vegetables.`;
      if (userBadVegs.includes('leeks')) this.game.question.innerHTML += `<br>Vegetables in the onion family including leeks are poisonous to bunnies.`;
      if (userBadVegs.includes('tomato-leaf')) this.game.question.innerHTML += `<br>Tomato leaves are toxic to bunnies.`;
      if (userBadVegs.includes('iceberg')) this.game.question.innerHTML += `<br>Iceberg lettuce can have toxins that are dangerous to bunnies. Feeding darker leaf lettuces are better.`;
    }
    this.game.question.innerHTML += `<br>Now bring ${this.name} to the water bowl to get some water.`
    this.game.form.innerHTML = `<input type="submit" value='Continue'>`;
    this.taskBar = `Move ${this.name} to the water bowl.`;
    this.info = `Research before introducing a new vegetable.`;
    this.target = `water`;
  }
  
  lesson4() {
    this.game.question.innerHTML = `The shelter has contacted you to ask if you would like to adopt another bunny. However ${this.name} is not spayed. Each option is $200. Would you like to adopt another bunny or spay ${this.name}?`;
    this.game.form.innerHTML = `<input type="radio" name="AdOrSp" id="adopt" required><label id="adopt">Adopt</label>
    <input type="radio" name="AdOrSp" id="spay"><label id="spay">Spay</label>
    <input type="submit" name="AdOrSp" value="Decide">`;
    this.game.form.classList.replace('input-form', 'adOrSp');
    this.taskBar = ``;
    this.info = `Spaying/Neutering your bunny will help reduce risk of cancer and can help with behavioral problems.`;
    this.target = ``;
  }
  
  lesson5() {
    this.game.question.innerHTML = `Congrats on spaying ${this.name}! This was the best choice to take to keep ${this.name} healthy. <br> It looks like ${this.name} left some droppings on the ground. Move ${this.name} around to pick them up.`;
    this.game.form.innerHTML = `<input type="submit" value='Continue'>`;
    this.taskBar = `${this.name} will need to rest in order to recover.`;
    this.info = `It is normal and healthy for bunnies to each their own droppings.`;
    this.target = `dropping`;
  }
  
  lesson8() {
    this.game.question.innerHTML = `You have chosen to adopt a friend. Please name and select which friend you would like.`;
    this.game.form.innerHTML = `<label for='input-text'>Name</label>
      <input type="text" id ='input-text' name='bunny-name' required><br>

      <input type='radio' id='brown-bunny' name='bunny-color' required>
      <label for='brown-bunny'><img src="./src/images/brown/brown_happy.png" alt="brown bunny pictures" class='bunny-image'></label>

      <input type='radio' id='grey-bunny' name='bunny-color'>
      <label for='grey-bunny'><img src="./src/images/grey/grey_happy.png" alt="grey bunny pictures" class='bunny-image'></label>

      <input type='radio' id='black-bunny' name='bunny-color'>
      <label for='black-bunny'><img src="./src/images/black/black_happy.png" alt="black bunny pictures" class='bunny-image'></label><br>
      <input type="submit" value='Play Game'>`;
      this.taskBar = `After deciding, bring ${this.name} to the couch to wait.`;
      this.info = `Bunnies needed to be slowly introduced as they are very territorial.`;
      this.target = `couch`;
  }
    
  lesson9() {
    this.game.adoptFriend();
    this.game.question.innerHTML = `It turns out ${this.name} and the new bunny did not get along. The shelter gave you the bunny that got along best with yours. Take some time to get to know ${this.game.friend.name}`;
    this.game.form.innerHTML = `<input type="submit" value='Continue'>`;
    this.taskBar = ``;
    this.info = `When getting another bunny, the 1st bunny will choose who they want to bond with.`;
    this.target = ``;
    setTimeout(() => {
      this.currentLessonNum += 1;
      this.game.runLesson();
    }, 5000);
  }

  lesson10() {
    this.game.question.innerHTML = `Oh no. It looks like both ${this.name} and ${this.game.friend.name} both weren't fixed and had babies. <br>Catch each baby bunny.`;
    this.game.form.innerHTML = `<input type="submit" value='Continue'>`;
    this.taskBar = `Catch each baby bunny.`;
    this.info = `Pet exercise pens are great for keeping your bunnies contained or separated.`;
    this.target = `baby`;
    this.game.form.addEventListener('submit', () => {
      this.game.multiplyBuns();
      setTimeout(() => {
        this.currentLessonNum += 1;
      }, 20000);
    })
  }
}