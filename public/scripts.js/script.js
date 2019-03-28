// новый
function sendRequest(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url); 
        xhr.send();
  
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject();
                }
            }
        }
      });
      
}


class ItemsList{
    consructor() {
        this.items = [];
    }
    
    getItems() {
        return sendRequest ('https://localhost3000/products.json'.then((products) => {
            this.items = products.map(item => new Item(item.name, item.price));
            return this.items;
        });
 
    }
    
    
    total() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }
    
    render() {
        const itemsHtml = this.items.map(item => item.render());
        
        return itemsHtml.join(' ');
    }
}

class Item {
    consructor(name, price) {
        this.price = price;
        this.name = name;
    }
    
    render() {
        return `<div class="item"><h3>${this.name}</h3><p>${this.price}</p></div>`
    }
}

const items = new ItemsList();
items.getItems().then(() => {
    document.querySelector('.goods').innerHTML = itemsHtml.render();
});





