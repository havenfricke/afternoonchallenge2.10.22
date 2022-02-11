let hero = {
  bacon: {
    armor: 100,
    emoji: '🥓',
    maxArmor: 100
  }
}
let boss = {
  shrimp: {
    armor: 10000,
    emoji: '🍤',
    maxArmor: 10000
  }
}
let clockID = 0

let useCount = 0
let ammoCount = 0

function drawBossHealth() {
  let template = ''
  for (let key in boss) {
    let hp = boss[key]
    template += `
    <div class="progress">
    <div class="progress-bar bg-danger" role="progressbar" style="width: ${Math.round((hp.armor / hp.maxArmor) * 100)}%;" aria-valuenow="100" aria-valuemin="0"
      aria-valuemax="100">${hp.armor}
    </div>
    </div>`
  }
  document.getElementById('boss-health').innerHTML = template
}

function drawHeroHealth() {
  let template = ''
  for (let key in hero) {
    let hp = hero[key]
    template += `
    <div class="progress">
    <div class="progress-bar bg-danger" role="progressbar" style="width: ${Math.round((hp.armor / hp.maxArmor) * 100)}%;" aria-valuenow="100" aria-valuemin="0"
      aria-valuemax="100">${hp.armor}
    </div>
    </div>`
  }
  document.getElementById('hero-health').innerHTML = template
}

function winnerCheck() {
  if (boss.shrimp.armor == 0) {
    console.log("You Win!!!")
    clearInterval(clockID)
  }
  if (hero.bacon.armor == 0) {
    console.log("You lose :(")
    clearInterval(clockID)
  }
}

function fireCannon() {
  ammoCount++
  boss.shrimp.armor -= 50
  console.log(boss.shrimp.armor)
  if (ammoCount == 10) {
    document.getElementById('cannon').classList.add("disabled")
  }
  winnerCheck()
  drawBossHealth()
}

function reloadCannon() {
  ammoCount = 0
  document.getElementById('cannon').classList.remove("disabled")
}

function shrimpPoison() {
  hero.bacon.armor -= 10
  console.log(hero.bacon.armor)
  if (hero.bacon.armor <= 0) {
    console.log('Ahhhh im ded lol')
  }
  drawHeroHealth()
}

function setShrimpPoison() {
  setInterval(shrimpPoison, 2200)
  drawHeroHealth()
}

function healthRestore() {
  hero.bacon.armor += 80
  useCount++
  if (hero.bacon.armor >= 100) {
    hero.bacon.armor = 100
  }
  if (useCount == 2) {
    document.getElementById('health').classList.add("disabled")
  }
  console.log('Restored Health to', hero.bacon.armor)
  drawHeroHealth()
}

function bigCannon() {
  boss.shrimp.armor -= 250
  console.log("OUCHIE MOMMA", boss.shrimp.armor)
  document.getElementById("big-cannon").classList.add("disabled")
  setTimeout(reloadBigBoy, 10000)
  winnerCheck()
  drawBossHealth()
}

function reloadBigBoy() {
  document.getElementById("big-cannon").classList.remove("disabled")
}


setShrimpPoison()
winnerCheck()
drawBossHealth()
drawHeroHealth()

