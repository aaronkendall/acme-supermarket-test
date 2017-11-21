class Basket {
  constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.items = [];
  }
  
  add(item) {
    this.items.push(item);
  }
  
  calculateTotalDiscount() {
    let totalDiscount = 0;
    
    this.pricingRules.forEach((rule) => {
      if (rule.discountCheck(this.items, rule.code)) {
        const itemsToDiscount = this.items.filter(item => item.code === rule.code);
        const price = itemsToDiscount[0].price;
        totalDiscount += rule.saving(itemsToDiscount.length, price);
      }
    });
    
    return totalDiscount;
  }
  
  total() {
    const totalPrice = this.items.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    const totalDiscounts = this.calculateTotalDiscount();
    const finalPrice = (totalPrice - totalDiscounts).toFixed(2);
    
    return `£${finalPrice}`;
  }
}

module.exports = Basket;