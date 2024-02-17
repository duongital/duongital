---
tags: flashcards
---

sydney tool version: 3.9.15

extends a xml template from default module ;; good
<!--SR:!2024-02-01,1,230-->

```xml
<t t-name="ProductsWidget" owl="1" t-inherit="point_of_sale.ProductsWidget" t-inherit-mode="extension">  
    <xpath expr="//div[hasclass('product-list-container')]" position="after">  
        <div class="mx-2 py-12"><p class="bg-white">li there</p></div>  
    </xpath>  
</t>
```

After {{ xml }} extended successfully we can create related controller that also extends parent controller:
- note: should be aware of expr formular and the position
- t-name: is whatever we want to, and it might have controller
- can't create any state from extended controller, we just only create additional functions
- in order to have separate component and controller, should be creating a different component (only need an xml to extend and then add your own component)
<!--SR:!2024-02-01,1,230-->

### example extended controller

```javascript
odoo.define('pos_zip.Cashier', function (require) {  
  'use strict'  
  const Cashier = require('point_of_sale.CashierName')  
  const Registries = require('point_of_sale.Registries')  
  
  const MyCashierName = (Cashier) => {  
    Cashier.template = 'MyCashierName'  
    return class extends Cashier {  
      get username() {  
        const {name} = this.env.pos.get_cashier()  
        return name ? `Hello ${name}` : ''  
      }  
      get avatar() {  
        const user_id = this.env.pos.get_cashier_user_id()  
        const id = user_id ? user_id : -1  
        return `/web/image/res.users/${id}/avatar_128`  
      }  
    }  
  }  
  MyCashierName.template = 'MyCashierName'  
  Registries.Component.extend(Cashier, MyCashierName)  
  return MyCashierName  
})
```