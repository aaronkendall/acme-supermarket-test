const Basket = require('./Basket');

describe('Basket Functionality', () => {
  let basket;
  const testRules = [
    { 
      code: 'FR1', 
      discountCheck: (items, code) => {
        return items.filter(item => item.code === code).length / 2 >= 1; 
      }, 
      saving: (numberOfItems, price) => {
        return Math.floor(numberOfItems / 2) * price;
      } 
    },
    { 
      code: 'SR1', 
      discountCheck: (items, code) => {
        return items.filter(item => item.code === code).length >= 3
      },
      saving: (numberOfItems, price) => {
        return price / 10 * numberOfItems;
      } 
    }
  ];
  
  const fruitTea = {
    code: 'FR1',
    name: 'Fruit tea',
    price: 3.11
  };
  const strawberries = {
    code: 'SR1',
    name: 'Strawberries',
    price: 5.00
  };
  const coffee = {
    code: 'CF1',
    name: 'Coffee',
    price: 11.23
  };
  
  beforeEach(() => {
    basket = new Basket(testRules);
  });
  
  afterEach(() => {
    basket = null;
  });
  
  it('an item can be added to the basket', () => {
    basket.add(fruitTea);
    expect(basket.items.length).toEqual(1);
    expect(basket.items[0].code).toEqual('FR1');
  });
  
  it('two items can be added and the correct total requested', () => {
    basket.add(fruitTea);
    basket.add(coffee);
    expect(basket.items.length).toEqual(2);
    expect(basket.total()).toEqual('£14.34');
  });
  
  it('applies discount correctly when adding four fruit teas to the basket and requesting the total', () => {
    basket.add(fruitTea);
    basket.add(fruitTea);
    basket.add(fruitTea);
    basket.add(fruitTea);
    
    expect(basket.total()).toEqual('£6.22');
  });
  
  it('applies discount correctly when adding three strawberries to the basket and requesting the total', () => {
    basket.add(strawberries);
    basket.add(strawberries);
    basket.add(strawberries);
    
    expect(basket.total()).toEqual('£13.50');
  });
  
  it('returns the correct total for two fruit teas, one strawberries and one coffee', () => {
    basket.add(fruitTea);
    basket.add(strawberries);
    basket.add(fruitTea);
    basket.add(coffee);
    
    expect(basket.total()).toEqual('£19.34');
  });
  
  it('returns the correct total for two fruit teas', () => {
    basket.add(fruitTea);
    basket.add(fruitTea);
    
    expect(basket.total()).toEqual('£3.11');
  });
  
  it('returns the correct total for three strawberries and one fruit tea', () => {
    basket.add(strawberries);
    basket.add(strawberries);
    basket.add(fruitTea);
    basket.add(strawberries);
    
    expect(basket.total()).toEqual('£16.61');
  });
});