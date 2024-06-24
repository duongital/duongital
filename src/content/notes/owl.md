---
title: 'Owl UI Library'
description: 'Look similar to VueJS and ReactJS'
---

# odoo xml

override

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
	<record id="product_template_tree_view_infinite_loading" model="ir.ui.view">
		<field name="name">product.template.product.tree</field>
		<field name="model">product.template</field>
		<field name="inherit_id" ref="product.product_template_tree_view"/>
		<field name="arch" type="xml">
			<xpath expr="//tree" position="attributes">
			<attribute name="limit">11</attribute>
			</xpath>
		</field>
	</record>
</odoo>
```

# owl qweb template

using `and` condition (same for `or`):

```xml
<span
	t-esc="!store.inputDirty and store.model === store.list?.resModel ? store.range : value"
	t-on-click="onValueClick"
/>
```

- Odoo is using class component for migrating all old `<odoo>` template, we can understand QWeb is a xml or syntax helps Python compile to HTML, JS, CSS.

# create a new component:

```javascript

/** @odoo-module **/
import { useAutofocus } from "../utils/hooks";
import { clamp } from "../utils/numbers";
import { Component, useExternalListener, useState } from "@odoo/owl";

export class Pager extends Component {
	setup() {
	this.state = useState({
		isEditing: false,
		isDisabled: false,
	});
	get minimum() {
	return this.props.offset + 1;
	}
}

Pager.template = "web.Pager"; // has a xml file to define

Pager.defaultProps = {
	isEditable: true,
	withAccessKey: true,
};

Pager.props = {
	offset: Number,
	limit: Number,
	isEditable: { type: Boolean, optional: true },
	withAccessKey: { type: Boolean, optional: true },
};

```

- and pointing to a QWeb template (t-name is really important):

```xml

<?xml version="1.0" encoding="UTF-8"?>
<templates xml:space="preserve">
	<t t-name="web.Pager" owl="1">
		<h1>Hello World</h1>
	</t>
</templates>

```

- It's done, remember to load these two file, defined in `__manifest__.py`

# old way to extend template and controller

- extends a xml template from default module→good

```xml

<t t-name="ProductsWidget" owl="1" t-inherit="point_of_sale.ProductsWidget" t-inherit-mode="extension">
	<xpath expr="//div[hasclass('product-list-container')]" position="after">
		<div class="mx-2 py-12"><p class="bg-white">li there</p></div>
	</xpath>
</t>

```

- After XML extended successfully we can create related controller that also extends parent controller:
- note: should be aware of expr formula and the position
- t-name: is whatever we want to, and it might have controller
- can't create any state from extended controller, we just only create additional functions
- in order to have separate component and controller, should be creating a different component (only need an xml to extend and then add your own component)

- example extended controller:

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