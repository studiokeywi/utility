## DOMHelper

> Native JS-based DOM helper module. Consists of three sub-modules: [Alchemy] (DOM element manipulation), [Proletariat] (CSS class manipulation), and [Snickerdoodle] (document cookie manipulation)

Developed by Kevin C Wickart. Released under MIT License for studioKeywi.

---

### About DOMHelper

**DOMHelper** was developed as a thin wrapper for native JavaScript functions related to working with the Document Object Model (DOM) of the web.

#### Background

> _Modern problems require modern solutions_

Although other libraries and frameworks exist that serve a similar purpose (notably [jQuery]), the intent of **DOMHelper** is to provide a bare/minimal wrapper around modern (ES6 and newer) native JavaScript. As such, there are likely to be missing features as compared to other libraries and frameworks, and there are no efforts made to make this code accessible to deprecated browsers (notably [Internet Explorer]).

> _You can depend on me (and me (and me (and me (...))))_

Use of modern libraries tends to come with an unseen cost in dependencies. The module you want to use may provide a single type of benefit, but it could require many things under the hood to get there. **DOMHelper** prefers to be as minimal as possible, thinly wrapping exising functions to provide a standardized way to access and modify the DOM.

> _Not recommended for external use. May cause unexpected complications. Talk with your physician_

Primarily, this module is designed for internal use. It represents an attempt at creating a basis for future software development by creating standards and expectations, and giving insight into the entire software development life cycle (including the Things They Don't Teach You In College&trade;).



#### Objectives

-   Reduce errors from working with out of date libraries
-   Reduce dependency on externally developed code
-   Provide reuasable/modular code for a variety of requirements

#### Functionality
The module exposes a single function, `DOMHelper([HTMLDocument `_`doc`_`])`, which takes an optional `HTMLDocument` as a parameter. Passing nothing will return the generic `DOMHelper` object whereas passing in a document will initialize the relevant submodules befor returning the `DOMHelper` object.

> **NOTE**: A `DOMHelper` that is pre-initialized with an document will also expose a special `maker` property on the returned version of [`Alchemy`][Alchemy]. Please read about this feature in the [`Alchemy`][Alchemy] subsection

The `DOMHelper` itself is a simple aggregation of the submodules [`Alchemy`][Alchemy], [`Proletariat`][Proletariat], and [`Snickerdoodle`][Snickerdoodle]. Please read about them in detail below in each of their sections.

#### Usage
```js
// Locally saved ES6 module
import DOMHelper from './path/to/DOMHelper/index.mjs';

// ...or...

// CDN delivered ES6 module
import DOMHelper from 'https://cdn.jsdelivr.net/gh/studiokeywi/utility/DOMHelper/index.mjs';

// ... then ...
const {
    Alchemy,
    Proletariat,
    Snickerdoodle
} = DOMHelper(window.document);
```

---

#### About Alchemy
[See Alchemy Readme](../Alchemy/README.md)

---
#### About Proletariat
[See Proletariat Readme](../Proletariat/README.md)


---

#### About Snickerdoodle
[See Snickerdoodle Readme](../Snickerdoodle/README.md)

---

### ES6 Compliance

This script relies heavily on modern (ES6+) native JavaScript to provide modern features without depending on external libraries and without regard to compatability with legacy/deprecated browsers. As such, the (nearly exhaustive) list below represents features that are known to cause support/compatability issues with non-modern browsers:

-   [array destructuring]
-   [arrow functions]
-   [const]
-   [defaults]
-   [export/import]
-   [let]
-   [object destructuring]
-   [object property assignment]
-   [object property shorthand]
-   [parameter destructuring]
-   [promises]
-   [promise combinations]
-   [proxying]
-   [rest parameter]
-   [spread operator]
-   [string interpolation]
-   [string searching]

> Thanks to http://es6-features/org for providing information on ES6 features
> 
> If you encounter a browser compatability issue not caused by an item on this list, or in a browser that is not legacy/deprecated, please contact the [lead developer]

---

<!-- Links -- won't be rendered in final MD output -->
<!-- misc -->
[jQuery]: https://www.jquery.com
[Internet Explorer]: https://en.wikipedia.org/wiki/Internet_Explorer_11
<!-- es6 -->
[array destructuring]: http://es6-features.org/#ArrayMatching
[arrow functions]: http://es6-features.org/#ExpressionBodies
[const]: http://es6-features.org/#Constants
[defaults]: http://es6-features.org/#DefaultWildcard
[export/import]: http://es6-features.org/#ValueExportImport
[let]: http://es6-features.org/#BlockScopedVariables
[object destructuring]: http://es6-features.org/#ObjectMatchingShorthandNotation
[object property assignment]: http://es6-features.org/#ObjectPropertyAssignment
[object property shorthand]: http://es6-features.org/#PropertyShorthand
[parameter destructuring]: http://es6-features.org/#ParameterContextMatching
[promises]: http://es6-features.org/#PromiseUsage
[promise combinations]: http://es6-features.org/#PromiseCombination
[proxying]: http://es6-features.org/#Proxying
[rest parameter]: http://es6-features.org/#RestParameter
[spread operator]: http://es6-features.org/#SpreadOperator
[string interpolation]: http://es6-features.org/#StringInterpolation
[string searching]: http://es6-features.org/#StringSearching
[lead developer]: mailto:dev+domhelper@studiokeywi.dev
<!-- nav -->
[Alchemy]: #About%20Alchemy
[Proletariat]: #About%20Proletariat
[Snickerdoodle]: #About%20Snickerdoodle