
const insert = document.querySelector('#insert')
const deletar = document.querySelector('#remove')

const palco = document.querySelector('#palco')

let largurapalco = palco.clientWidth
let alturapalco = palco.clientHeight

let numobjects = document.querySelector('#qtd')
let numbolas = 0

let bolas = []

class Bolinha{
    constructor(palco,array){
        numbolas++
        numobjects.innerHTML = numbolas
        this.array = array
        this.palco = palco

        this.largurapalco = largurapalco
        this.alturapalco = alturapalco

        this.tam = Math.floor(Math.random()*10)+10

        this.r = Math.floor(Math.random()*255)
        this.g = Math.floor(Math.random()*255)
        this.b = Math.floor(Math.random()*255)

        this.posx = Math.floor(Math.random()*(largurapalco-this.tam))
        this.posy = Math.floor(Math.random()*(alturapalco-this.tam))

        this.velx = Math.floor(Math.random()*3) + 0.5
        this.vely = Math.floor(Math.random()*3) + 0.5

        this.dirx = Math.floor(Math.random()*2) > 1 ? 1:-1
        this.diry = Math.floor(Math.random()*2) > 1 ? 1:-1

        this.id = Math.floor(Math.random()*99999999999)
        
        this.desenhar()
        this.controle = setInterval(this.controlar,10)
        this.eu = document.getElementById(this.id)
        
    }
    minhapos=()=>{
        return this.array.indexOf(this)
    }
    remover=()=>{
        clearInterval(this.controle)
        bolas=bolas.filter((b)=>{
            if (b.id !== this.id){
                return b
            } 
        })
        this.eu.remove()
        numbolas--
        numobjects.innerHTML = numbolas
    }
    
    desenhar=()=>{
        const div = document.createElement('div')
        div.setAttribute('id',this.id)
        div.setAttribute('class','bolinha')
        div.setAttribute('style',`background-color: rgb(${this.r},${this.g},${this.b});left:${this.posx}px; top:${this.posy}px;width:${this.tam}px; height:${this.tam}px;`)
        this.palco.appendChild(div)
        
    }
    colidir=()=>{
        if((this.posx + (this.tam) >= largurapalco) || this.posx <= 0){
            this.dirx*=-1
        }
        if((this.posy + (this.tam) >= alturapalco) || this.posy <= 0){
            this.diry*=-1
        }
    }
    controlar=()=>{
        this.colidir()
        if((this.posx) >= largurapalco || ((this.posy) >= alturapalco)){
            this.remover()
        }
        this.posx+=this.dirx*this.velx
        this.posy+=this.diry*this.vely
        this.eu.setAttribute('style',`background-color: rgb(${this.r},${this.g},${this.b});left:${this.posx}px; top:${this.posy}px;width:${this.tam}px; height:${this.tam}px;`)
    }
}

window.addEventListener('resize',()=>{
    largurapalco = palco.clientWidth
    alturapalco = palco.clientHeight
    console.log(largurapalco)
    console.log(alturapalco)
})

insert.addEventListener('click',()=>{
    const quantidade = document.querySelector('#adicionar').value
    let i=0
    while (i < quantidade){
        bolas.push(new Bolinha(palco,bolas))
        i++
    }
})

deletar.addEventListener('click',()=>{
    bolas.map((el)=>{
        el.remover()
    })
})