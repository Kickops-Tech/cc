# :credit_card: `@kickops/cc`

> Credit card validation library, based on `creditcard.js`. Still aiming to be simple.

---

## :thinking: How to

Install the library with your favorite package manager:

```sh
npm install @kickops/cc
```

Then just import the resources you need:

```ts
import { isValid } from '@kickops/cc';

const testNumber = '4444444444444448';

if (isValid(testNumber)) {
  // Etc.
}
```

---

## :nerd_face: Documentation

For the full documentation of this library, please check the [**wiki**][0].

---

## :v: Acknowledgements + References

- [**creditcard.js**](https://github.com/contaazul/creditcard.js)
- [**This gist**](https://gist.github.com/gusribeiro/263a165db774f5d78251) by [@gusribeiro](https://github.com/gusribeiro), which was also used as reference when searching for some credit card flags (mostly Brazilian)
- Also payment gateways, providers and other resources, from which the test credit card numbers have been sourced

> ##### :warning: IMPORTANT :warning:
>
> Some credit card flags don't have test cases, as they were nowhere to be found, and were added mostly because supporting them was needed and some test cases were found on some of the references.
>
> If you have a test case for any of these, feel free to contribute! :wink:
>
> The list of credit card flags without test cases are:
>
> - Maxxvan
> - Personal Card

---

## :book: License

This project is licensed under the `MIT License`. Please see [`LICENSE.md`](./LICENSE.md) for details.

---

_&copy;2024 Kickops_

[0]: https://github.com/Kickops-Tech/cc
