//TBI support items decomposition beyond Array
//TBI consider a plugin architecture for comprehensions and terminal operators

import is from './Is';

class Enumerate {

    //#region Type

    //#region Methods

    /**
     * Projects items into a new form.
     *
     * @private
     * @static
     *
     * @param { Function<?Object, Number?, Array?> } selector
     *      A transform operation to apply.
     * @param { Array } items
     *      An array to select from.
     * @returns { Array }
     *      A new array whose items are the result of invoking the transform operation.
     */
    static _select(selector, items) {
        return items.map(selector);
    }

    /**
     * Filters for items that meet a condition.
     *
     * @private
     * @static
     *
     * @param { Function<?Object, Number?, Array?>? } predicate
     *      A condition-check operation to apply. This argument is optional.
     * @param { Array } items
     *      An array to select from.
     * @returns { Array }
     *      A new array that contains all items for which the condition-check operation returns true.
     *      If the operation returns false for every item, the length of the new array is 0. If the operation
     *      is not provided, a copy of items is returned.
     */
    static _where(predicate, items) {
        return is(predicate).defined ? items.filter(predicate) : items.slice(0);
    }

    //#endregion

    //#endregion

    //#region Disposition

    /**
     * @param { Array<Any> } items
     */
    constructor(items) {
        //init
        this._.items = items
            .map(item => is(item).anArray ? item : [item])
            .reduce((aggregate, items) => (aggregate || []).concat(items));
    }

    //#endregion

    //#region Properties

    /**
     * A dictionary that contains the collective state of this Enumerate instance.
     *
     * @private
     *
     * @returns { Object }
     */
    get _() {
        return this.__ || (this.__ = Object.create(null));
    }

    /**
     * @private
     *
     * @returns { Array<Any> }
     */
    get _items() {
        return this._.items;
    }

    /**
     * @private
     *
     * @returns { Array<Function> }
     */
    get _operations() {
        return this._.operations || (this._.operations = []);
    }

    //#endregion

    //#region Methods

    aggregate(/*accumulator, seed, selector*/) {
        /// <signature>
        ///		<summary>
        ///			Applies an accumulator function over the array. The specified seed value is used as the initial accumulator
        ///			value, and the specified function is used to select the result value.
        ///		</summary>
        ///		<param name="accumulator" type="Func" elementType="Object?, Object? accumulatedValue, Object? item, [Number index], [Array context]">
        ///			An accumulator function to apply on each array item. When accumulator is invoked, its this keyword refers to
        ///			the array being tested.
        ///		</param>
        ///		<param name="seed" type="Object" mayBeNull="true" optional="true" defaultValue="null">
        ///			The initial accumulator value.
        ///		</param>
        ///		<param name="selector" type="Func" optional="true" elementTYpe="Object?, Object? accumulatedValue">
        ///			A transform function to apply to the final accumulated value.
        ///		</param>
        ///		<returns type="Object" mayBeNull="true">
        ///			If the array contains at least on item, An optionally transformed accumulatedValue value; otherwise, an optionally
        ///			transformed seed value.
        ///		</returns>
        ///		<exception>
        ///			accumulator is not a Function type.
        ///		</exception>
        ///		<exception>
        ///			selector is provided but not a Function type.
        ///		</exception>
        /// </signature>

        // 			//assert
        // 			Debug.assert(typeof accumulator == 'function');
        // 			Debug.assert(typeof selector == 'function' || selector === undefined);
        //
        // 			//coerce
        // 			if (seed === undefined) seed = null;
        //
        // 			var result = this.reduce(accumulator.bind(this), seed);
        // 			if (selector) result = selector(result);
        //
        // 			return result === undefined ? null : result;
    }

    /**
     * Determines whether all items satisfy a condition.
     *
     * @param { Function<?Object, Number?, Array?> } predicate
     *      A condition-check operation to apply. The operation is applied to each item in this instance
     *      until it returns false, or until the end of the enumeration is reached.
     * @returns { Boolean }
     *      true if every item satisfies the predicate, if this instance has no items or
     *      if predicate is not provided; otherwise false.
     */
    all(predicate) {
        return !is(predicate).defined || this.toArray().every(predicate);
    }

    /**
     * Determines whether any item satisfies a condition.
     *
     * @param { Function<?Object, Number?, Array?> } predicate
     *      A condition-check operation to apply. The operation is applied to each item in this instance
     *      until it returns true, or until the end of the enumeration is reached.
     * @returns { Boolean }
     *      true if at least one item satisfies the predicate, or if this Enumerate instance is not
     *      empty and predicate is not provided; otherwise false.
     */
    any(predicate) {
        return is(predicate).defined ? this.toArray().some(predicate) : !!this.toArray().length;
    }

    at(/*index, defaultValue*/) {
        /// <signature>
        ///		<summary>
        ///			Returns the item at a specified index or a default value of the index is out of range.
        ///		</summary>
        ///		<param name="index" type="Number" integer="true">
        ///			A number representing The zero-based index to retrieve.
        ///		</param>
        ///		<param name="defaultValue" type="Object" mayBeNull="true" optional="true">
        ///			A value to return if {pname_0} is out of range.
        ///		</param>
        ///		<returns type="Object" mayBeNull="true">
        ///			The item at position specified by {pname_0} if {pname_0} is in range; otherwise, {pname_1}. If {pname_0} is out of range
        ///			and {pname_1} is not provided, null is returned.
        ///		</returns>
        ///		<exception>
        ///			{pname_0} is not a {ptype_0}.
        ///		</exception>
        /// </signature>

        // 			DebugEx.assert(typeof index == 'number');
        //
        // 			return ((index >= 0 && index < this.length) ? this[index] : defaultValue) || null;
    }

    average() { }

    batch() {
        //TBI batch - port from select many and derive select many from it - http://jscriptlinq.codeplex.com/wikipage?title=batch&referringTitle=Documentation
    }

    cast(/*type*/) {
        //[AlternateSignature]
        //extern public static List<R> Cast<T, R>(List<T> source, R type);
        //public static ArrayList Cast(ArrayList source, Type type)
        //{

        //	Contract.Requires(type != null);
        //	Contract.Requires(All(source, delegate(Dictionary item, int index, ArrayList list) { return type.IsInstanceOfType(item); }));

        //return OfType(source, type);
        //}
    }

    clone() {
        //				/// <summary>
        //				///		Creates a new array from items in the array.</summary>
        //				///	<returns type="Array">
        //				///		A new array containing items from the array. The copied items are not cloned themselves; they are equivalent references to the
        //				///		items in the array.</returns>

        //if (!_.isObject(obj)) return obj;
        //return _.isArray(obj) ? obj.slice() : _.extend({}, obj);

        //				return this.length == 1 ? [this[0]] : Array.apply(null, this);
    }

    contains(/*item, comparer*/) {
        /// <signaure>
        ///		<summary>
        ///			Determines whether an item is in the array.
        ///		</summary>
        ///		<param name="item" type="Object" mayBeNull="true" optional="true">
        ///			An object to locate in the array.
        ///		</param>
        ///		<param name="comparer" type="Func" elementType="Boolean, [Object?], [Object?]" optional="true">
        ///			A function used to determine equality between item and the items in the array.
        ///		</param>
        ///		<returns type="Boolean">
        ///			true if item is found in the array; otherwise, false.
        ///		</returns>
        ///		<exception>
        ///			comparer is provided but not a Function type.
        ///		</exception>
        /// </signaure>

        //assert
        // 			Debug.assert(typeof comparer == 'Function' || comparer === undefined);
        //
        // 			var result = false;
        //
        // 			if (comparer) {
        // 				for (var i = 0, c = this.length; i < c; i++)
        // 					if (result = comparer(this[i], item))
        // 						break;
        // 			}
        // 			else
        // 				result = this.indexOf(item) >= 0;
        //
        // 			return result;
    }

    count(/*predicate*/) {
        /// <signaure>
        ///		<summary>
        ///			Returns the number of items that satisfy a condition.
        ///		</summary>
        ///		<param name="predicate" type="Function" optional="true">
        ///			<signature>
        ///				<summary>
        ///					A condition-check operation to apply. When {pname_0} is invoked, its this keyword refers to {this}.
        ///				</summary>
        ///				<param name="item" type="Object" mayBeNull="true" />
        ///				<param name="index" type="Number" optional="true" />
        ///				<param name="context" type="Array" optional="true" />
        ///				<returns type="Boolean" />
        ///			</signature>
        ///		</param>
        ///		<returns type="Number" integer="true">
        ///			The number of array items that satisfy {pname_0}, or the array length if {pname_0} is not provided.
        ///		</returns>
        /// </signaure>

        //return (typeof predicate == 'function' ? ArrayEx._where.call(this, predicate) : this).length;
    }

    defaultIfEmpty(/*defaultValue*/) {
        //				/// <summary>
        //				///		</summary>
        //				/// <param name="defaultItem" type="Any" optional="true">
        //				///		</param>
        //				/// <returns type="Array">
        //				///		</returns>

        //				if (!Is.defined(defaultItem))
        //					defaultItem = null;

        //				return Ensure.aNotEmptyArray(this.isEmpty() ? [defaultItem] : this.slice(0));


        //[AlternateSignature]
        //extern public static List<T> DefaultIfEmpty<T>(List<T> source, T defaultValue);
        //public static ArrayList DefaultIfEmpty(ArrayList source, object defaultValue)
        //{
        //	return source != null && source.Count > 0 ? source : new ArrayList(defaultValue);
        //}
    }

    distinct(/*comparer, keySelector*/) {
        //				/// <summary>
        //				///		</summary>
        //				/// <param name="comparer" type="Function" optional="true">
        //				///		func&lt;Any first, Any second, Boolean&gt;</param>
        //				///	<returns type="Array">
        //				///		</returns>

        //				var result = [];

        //				this.forEach(function(item) {
        //					if (!result.contains(item, comparer))
        //						result.push(item);
        //				});

        //[AlternateSignature]
        //extern public static List<T> Distinct<T>(List<T> source, Func<T, T, bool> comparer);
        //public static ArrayList Distinct(ArrayList source, Func<Dictionary, Dictionary, bool> comparer)
        //{

        //	if (Type.GetScriptType(comparer) == "string") comparer = (Func<Dictionary, Dictionary, bool>)(object)Lambda.Compile((string)(object)comparer);


        //	ArrayList distinct = new ArrayList();

        //	if (source != null) foreach (Dictionary item in source) if (!Contains(distinct, item, comparer)) distinct.Add(item);

        //	return distinct;
        //}

        //function distinctBy(/*Array*/ source, /*Func<Dictionary, object>*/ keySelector, /*Func<Dictionary, Dictionary, bool>?*/ comparer) {
        //	//#region Assert

        //	//Contract.Requires(keySelector != null);
        //	//Contract.Ensures(Contract.Result() != null);

        //	//#endregion

        //	//#region Coerce

        //	//if (Script.IsNullOrUndefined(comparer)) comparer = delegate(Dictionary first, Dictionary second) { return first == second; };

        //	//#endregion

        //	//return
        //	//(ArrayList)(object)
        //	//Enumerable.Select<KeyValuePair<object, object>, object> (
        //	//	Enumerable.Distinct<KeyValuePair<object, object>> (
        //	//		Enumerable.ToDictionary(source, keySelector),
        //	//		delegate(KeyValuePair<object, object> first, KeyValuePair<object, object> second) { return comparer((Dictionary)first.Key, (Dictionary)second.Key); }
        //	//	),
        //	//	delegate(KeyValuePair<object, object> item) { return item.Value; }
        //	//);
        //}
    }

    equals(/*other*/) {
        //				/// <summary>
        //				///		</summary>
        //				/// <param name="other" type="Array">
        //				///		</param>
        //				/// <param name="comparer" type="Function" optional="true">
        //				///		func&lt;Any first, Any second, Boolean&gt;
        //				///		</param>
        //				/// <returns type="Boolean">
        //				///		</returns>

        //				var result = Is.array(other) && this.length == other.length;

        //				if (result) {
        //					comparer = As.aFunction(comparer) || Delegate.defaultComparer;

        //					for (var i = 0, c = this.length; i < c; i++) {
        //						if (!(result = comparer(this[i], other[i])))
        //							break;
        //					}
        //				}

        //				return Ensure.aBool(result);
    }

    except() {
        //				/// <signature>
        //				///		<summary>
        //				///			</summary>
        //				///		<param name="other" type="Array">
        //				///			</param>
        //				///		<param name="comparer" type="Function" optional="true">
        //				///			func&lt;Any first, Any second, Boolean&gt;</param>
        //				///		<returns type="Array">
        //				///			</returns></signature>
        //				/// <signature>
        //				///		<summary>
        //				///			</summary>
        //				///		<param name="other" type="Any">
        //				///			</param>
        //				///		<param name="comparer" type="Function" optional="true">
        //				///			func&lt;Any first, Any second, Boolean&gt;</param>
        //				///		<returns type="Array">
        //				///			</returns></signature>

        //				Require.a(other);

        //				if (!Is.array(other))
        //					other = [other];

        //				return Ensure.anArray(this.where(function(item) { return !other.contains(item, comparer); }));
    }

    extract(/*index, count*/) {
        //				/// <summary>
        //				///		</summary>
        //				/// <param name="index" type="Number">
        //				///		</param>
        //				/// <param name="count" type="Number" optional="true">
        //				///		</param>
        //				/// <returns type="Array">
        //				///		</returns>

        //				return Ensure.anArray(this.slice((index = Math.max(0, index)), !count ? null : index + Math.max(0, count)));
    }

    first(/*predicate, defaultValue*/) {
        /// </ignature>
        ///		<summary>
        ///			Returns the first array item that meets a condition, or a default value if no items meet a condition.
        ///		</summary>
        ///		<param name="predicate" type="Func" elementType="Boolean, Object? item, [Number index], [Array context]" optional="true" defaultValue="Delegate.defaultPredicate">
        ///			A condition function to apply. When predicate is invoked, its this keyword refers to the array being operated on.
        ///			predicate is applied to each item in the array until it returns true, or until the end of the array is reached.
        ///		</param>
        ///		<param name="defaultValue" type="Object" mayBeNull="true" optional="true">
        ///			A value to return if no items meet the condition specified by predicate.
        ///		</param>
        ///		<returns type="Object" mayBeNull="true" optional="true">
        ///			The first array item that meets the condition specified in predicate, or defaultValue if no items meet
        ///			the condition. If predicate is not provided, the first array item is returned. If defaultValue is to be
        ///			returned but is not provided, undefined is returned.
        ///		</returns>
        ///		<exception>
        ///			predicate is provided but not a Function type.
        ///		</exception>
        /// </signature>

        // 			//assert
        // 			Debug.assert(typeof predicate == 'function' || predicate === undefined);
        //
        // 			//coerce
        // 			if (!predicate) predicate = Delegate.defaultPredicate;
        //
        // 			var result = defaultValue;
        // 			var item;
        //
        // 			for (var i = 0, c = this.length; i < c; i++)
        // 				if (predicate.call(this, item = this[i], i, this)) {
        // 					result = item;
        // 					break;
        // 				}
        //
        // 			return result;
    }

    firstIndex(/*predicate*/) {
        /// </ignature>
        ///		<summary>
        ///			Returns the index of the first array item that meets a condition.
        ///		</summary>
        ///		<param name="predicate" type="Func" elementType="Boolean, Object? item, [Number index], [Array context]" optional="true" defaultValue="Delegate.defaultPredicate">
        ///			A condition function to apply. When predicate is invoked, its this keyword refers to the array being operated on.
        ///			predicate is applied to each item in the array until it returns true, or until the end of the array is reached.
        ///		</param>
        ///		<returns type="Number" integer="true">
        ///			The index of the first array item that meets the condition specified in predicate; otherwise, -1. If predicate is
        ///			not provided and the array is not empty, 0 is returned; otherwise, -1 is returned.
        ///		</returns>
        ///		<exception>
        ///			predicate is provided but not a Function type.
        ///		</exception>
        /// </signature>

        // 			//assert
        // 			Debug.assert(typeof predicate == 'function' || predicate === undefined);
        //
        // 			//coerce
        // 			if (!predicate) predicate = Delegate.defaultPredicate;
        //
        // 			var result = -1;
        //
        // 			for (var i = 0, c = this.length; i < c; i++)
        // 				if (predicate.call(this, this[i], i, this)) {
        // 					result = i;
        // 					break;
        // 				}
        //
        // 			return result;
    }

    groupBy() { }

    groupJoin() { }

    intersect() {
        //				/// <signature>
        //				///		<summary>
        //				///			</summary>
        //				///		<param name="other" type="Array">
        //				///			</param>
        //				///		<param name="comparer" type="Function" optional="true">
        //				///			func&lt;Any first, Any second, Boolean&gt;</param>
        //				///		<returns type="Array">
        //				///			</returns></signature>
        //				/// <signature>
        //				///		<summary>
        //				///			</summary>
        //				///		<param name="other" type="Any">
        //				///			</param>
        //				///		<param name="comparer" type="Function" optional="true">
        //				///			func&lt;Any first, Any second, Boolean&gt;</param>
        //				///		<returns type="Array">
        //				///			</returns></signature>

        //				Require.isDefined(other);

        //				if (!Is.array(other))
        //					other = [other];

        //				return Ensure.anArray(this.distinct(comparer).where(function(item) { return other.contains(item, comparer); }));
    }

    isEmpty() {
        /// <signaure>
        ///		<summary>
        ///			Determines if {this} contains any items.
        ///		</summary>
        ///		<returns type="Boolean">
        ///			true if {this} contains at least one item; otherwise, false.
        ///		</returns>
        /// </signaure>

        //return !this.length;
    }

    join() { }

    last(/*predicate, defaultValue*/) {
        /// </ignature>
        ///		<summary>
        ///			Returns the last array item that meets a condition, or a default value if no items meet a condition.
        ///		</summary>
        ///		<param name="predicate" type="Func" elementType="Boolean, Object? item, [Number index], [Array context]" optional="true" defaultValue="Delegate.defaultPredicate">
        ///			A condition function to apply. When predicate is invoked, its this keyword refers to the array being operated on.
        ///			predicate is applied to each item in the array until it returns true, or until the start of the array is reached.
        ///		</param>
        ///		<param name="defaultValue" type="Object" mayBeNull="true" optional="true">
        ///			A value to return if no items meet the condition specified by predicate.
        ///		</param>
        ///		<returns type="Object" mayBeNull="true" optional="true">
        ///			The last array item that meets the condition specified in predicate, or defaultValue if no items meet
        ///			the condition. If predicate is not provided, the last array item is returned. If defaultValue is to be
        ///			returned but is not provided, undefined is returned.
        ///		</returns>
        ///		<exception>
        ///			predicate is provided but not a Function type.
        ///		</exception>
        /// </signature>

        // 			//assert
        // 			Debug.assert(typeof predicate == 'function' || predicate === undefined);
        //
        // 			//coerce
        // 			if (!predicate) predicate = Delegate.defaultPredicate;
        //
        // 			var result = defaultValue;
        // 			var item;
        //
        // 			for (var i = this.length - 1; i >= 0; i--)
        // 				if (predicate.call(this, item = this[i], i, this)) {
        // 					result = item;
        // 					break;
        // 				}
        //
        // 			return result;
    }

    lastIndex(/*predicate*/) {
        /// </ignature>
        ///		<summary>
        ///			Returns the index of the last array item that meets a condition.
        ///		</summary>
        ///		<param name="predicate" type="Func" elementType="Boolean, Object? item, [Number index], [Array context]" optional="true" defaultValue="Delegate.defaultPredicate">
        ///			A condition function to apply. When predicate is invoked, its this keyword refers to the array being operated on.
        ///			predicate is applied to each item in the array until it returns true, or until the start of the array is reached.
        ///		</param>
        ///		<returns type="Number" integer="true">
        ///			The index of the last array item that meets the condition specified in predicate; otherwise, -1. If predicate is
        ///			not provided and the array is not empty, the index of the last array item is returned; otherwise, -1 is returned.
        ///		</returns>
        ///		<exception>
        ///			predicate is provided but not a Function type.
        ///		</exception>
        /// </signature>
        //
        // 			//assert
        // 			Debug.assert(typeof predicate == 'function' || predicate === undefined);
        //
        // 			//coerce
        // 			if (!predicate) predicate = Delegate.defaultPredicate;
        //
        // 			var result = -1;
        //
        // 			for (var i = this.length - 1; i >= 0; i--)
        // 				if (predicate.call(this, this[i], i, this)) {
        // 					result = i;
        // 					break;
        // 				}
        //
        // 			return result;
    }

    max() { }

    min() { }

    ofType(/*type*/) {
        //[AlternateSignature]
        //extern public static List<R> OfType<T, R>(List<T> source, R type);
        //public static ArrayList OfType(ArrayList source, Type type)
        //{

        //	Contract.Requires(type != null);


        //	return Where(source, delegate(Dictionary item, int index, ArrayList list) { return type.IsInstanceOfType(item); });
        //}

    }

    orderBy(/*descending*/) { }

    postfix() {
        //TBI postfix - http://jscriptlinq.codeplex.com/wikipage?title=pad&referringTitle=Documentation
        //TBI postfixWith - http://jscriptlinq.codeplex.com/wikipage?title=pad&referringTitle=Documentation
    }

    prefix() {
        //TBI prefix - http://jscriptlinq.codeplex.com/wikipage?title=prepend&referringTitle=Documentation
    }

    remove(/*predicate*/) {
        //function remove(/*Array*/ source, /*Func<Dictionary, bool>*/ predicate) {
        //	//#region Assert

        //	//Contract.Requires(predicate != null);
        //	//Contract.Ensures(Contract.Result() != null);

        //	//#endregion

        //	//return Where(source, delegate(Dictionary item) { return !predicate(item); });
        //}
    }

    /**
     * Projects items into a new form.
     *
     * @param { Function<?Object, Number?, Array?> } selector
     *      A transform operation to apply.
     * @returns { Enumerate }
     *      This enumerate instance, useful for chaining multiple operations.
     */
    select(selector) {
        this._operations.push(Enumerate._select.bind(this, selector));
        return this;
    }

    selectMany() { }

    skip(/*count*/) {
        //[AlternateSignature]
        //extern public static List<T> Skip<T>(List<T> source, int count);
        //public static ArrayList Skip(ArrayList source, int count)
        //{
        //	return source == null ? new ArrayList() : count <= 0 ? source : (ArrayList)(object)source.Extract(count);
        //}
    }

    skipWhile(/*predicate*/) {
        //[AlternateSignature]
        //extern public static List<T> SkipWhile<T>(List<T> source, Func<T, int, List<T>, bool> predicate);
        //public static ArrayList SkipWhile(ArrayList source, Func<Dictionary, int, ArrayList, bool> predicate)
        //{

        //	if (Type.GetScriptType(predicate) == "string") predicate = (Func<Dictionary, int, ArrayList, bool>)(object)Lambda.Compile((string)(object)predicate);

        //	Contract.Requires(predicate != null);

        //	int count = 0;

        //	if (source != null)
        //		while (count < source.Count && predicate((Dictionary)source[count], count, source))
        //			count++;

        //	return Skip(source, count);
        //}
    }

    skipUntil(/*predicate*/) { /*TBI skipUntil - http://jscriptlinq.codeplex.com/wikipage?title=skipUntil&referringTitle=Documentation */ }

    sum() { }

    take(/*count*/) {
        // [AlternateSignature]
        // extern public static List<T> Take<T>(List<T> source, int count);
        // public static ArrayList Take(ArrayList source, int count)
        // {
        //     return source != null && source.Count > 0 ? (ArrayList)(object)source.Extract(0, count) : new ArrayList();
        // }
    }

    takeEvery() { /*TBI takeEvery - http://jscriptlinq.codeplex.com/wikipage?title=takeLast&referringTitle=Documentation*/ }

    takeLastfunction() { /*TBI takeLast - http://jscriptlinq.codeplex.com/wikipage?title=takeLast&referringTitle=Documentation*/ }

    takeUntil() { /*TBI takeUntil - http://jscriptlinq.codeplex.com/wikipage?title=skipUntil&referringTitle=Documentation */ }

    takeWhile(/*predicate*/) {
        // [AlternateSignature]
        // extern public static List<T> TakeWhile<T>(List<T> source, Func<T, int, List<T>, bool> predicate);
        // public static ArrayList TakeWhile(ArrayList source, Func<Dictionary, int, ArrayList, bool> predicate)
        // {
        //
        //     if (Type.GetScriptType(predicate) == "string") predicate = (Func<Dictionary, int, ArrayList, bool>)(object)Lambda.Compile((string)(object)predicate);
        //
        //
        //     Contract.Requires(predicate != null);
        //
        //     int count = 0;
        //
        //     if (source != null)
        //         while (count < source.Count && predicate((Dictionary)source[count], count, source))
        //             count++;
        //
        //     return Take(source, count);
        // }
    }

    thenBy(/*descending*/) { }

    /**
     * @returns { Array<Any> }
     */
    toArray() {
        let result = this._items;

        for (const operation of this._operations)
            result = operation.bind(this, result)();

        return result;
    }

    /// <summary>
    ///		Creates a dictionary of key-value pairs using key- and value-generating functions.</summary>
    /// <param name="keySelector" type="Function">
    ///		func&lt;Any item, String&gt;
    ///		&#10;A function to create a dictionary key for each item in the array. If the function generates anything other than a non-empty string
    ///		or a string that duplicates a prior key, the item from which the key was generated is not added to the dictionary.</param>
    /// <param name="valueSelector" type="Function" optional="true">
    ///		func&lt;Any item, Any&gt;
    ///		&#10;A function to create a dictionary value for each item in the array. If [valueSelector] is not provided, the item itself is the value.</param>
    ///	<returns type="Object">
    ///		An object containing generated key-value pairs as its properties.</returns>
    toDictionary() {
        // Require.aFunction(keySelector);
        //
        // var result = {};
        // var key;
        //
        // this.forEach(function(item) {
        //     key = keySelector(item);
        //
        //     if (!String.isNullOrEmpty(key) && !(key in result))
        //         result[key] = Is.aFunction(valueSelector) ? valueSelector(item) : item;
        // });
        //
        // return Ensure.a(result);
    }

    /// <summary>
    ///		Indexes the items of the array into a dictionary of key-value pairs using a key-generating Delegate.</summary>
    /// <param name="keySelector" type="Function">
    ///		func&lt;Any item, String&gt;
    ///		&#10;A function to create an index key for each item in the array. If the function generates anything other than a non-empty string
    ///		or a string that duplicates a prior key, the item from which the key was generated is not added to the index.</param>
    ///	<returns type="Object">
    ///		An object containing key-value pairs indexed by [keySelector] as its properties.</returns>
    toIndex(/*keySelector*/) {
        //return Ensure.a(this.toDictionary(keySelector));
    }

    toLookup() { }

    union() { }

    zip() { }

    /**
     * Filters for items that meet a condition.
     *
     * @param { Function<?Object, Number?, Array?>? } predicate
     *      A condition-check operation to apply. This argument is optional.
     * @returns { Array }
     *      This enumerate instance, useful for chaining multiple operations.
     */
    where(predicate) {
        this._operations.push(Enumerate._where.bind(this, predicate));
        return this;
    }

    //#endregion

}

export default (...items) => new Enumerate(items);