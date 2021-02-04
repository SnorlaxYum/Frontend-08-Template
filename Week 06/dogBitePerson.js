class Person {
    constructor(name) {
        this.name = name
        this.health = 1000
    }
    hurt(damage) {
        if(typeof damage == "object") {
            this.health -= damage[1]
            console.log(`${this.name}被${damage[0]}攻击，受到${damage[1]}点伤害，剩余${this.health}生命值。`)
            return
        }
        this.health -= damage
        console.log(`${this.name}受到${damage}点伤害，剩余${this.health}生命值。`)
    }
}

class Dog {
    constructor(name) {
        this.name = name
        this.attack = 100
    }
    bite(anonymous) {
        if(!anonymous) {
            return [this.name, this.attack]
        }
        return this.attack
    }
}

let dog = new Dog('Lily')
let per = new Person('可怜的小男孩')

per.hurt(dog.bite(false))