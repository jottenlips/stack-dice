
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.6' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.42.6 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t0;
    	let span0;
    	let t1_value = /*ideas*/ ctx[5][/*randomIdea*/ ctx[24]] + "";
    	let t1;
    	let t2;
    	let span1;
    	let t3_value = /*audiences*/ ctx[6][/*randomAudience*/ ctx[25]] + "";
    	let t3;
    	let t4;
    	let t5_value = "\n" + "";
    	let t5;
    	let t6;
    	let a0;

    	let t7_value = (/*hasBackend*/ ctx[8]
    	? `${/*backend*/ ctx[1][/*randomBackend*/ ctx[20]]}\n`
    	: "") + "";

    	let t7;
    	let a0_href_value;
    	let t8;
    	let a1;

    	let t9_value = ((/*hasFrontend*/ ctx[10] || /*hasMobile*/ ctx[11]) && /*hasBackend*/ ctx[8] && /*hasAPI*/ ctx[9]
    	? `${/*api*/ ctx[2][/*randomAPI*/ ctx[21]]}\n`
    	: "") + "";

    	let t9;
    	let a1_href_value;
    	let a2;

    	let t10_value = (/*hasFrontend*/ ctx[10]
    	? `${/*frontend*/ ctx[3][/*randomFrontend*/ ctx[22]]}\n`
    	: "") + "";

    	let t10;
    	let a2_href_value;
    	let a3;

    	let t11_value = (/*hasMobile*/ ctx[11]
    	? `${/*mobile*/ ctx[4][/*randomMobile*/ ctx[23]]}\n`
    	: "") + "";

    	let t11;
    	let a3_href_value;
    	let a4;

    	let t12_value = (/*hasDatabase*/ ctx[7]
    	? `${/*database*/ ctx[0][/*randomDatabase*/ ctx[19]]}\n`
    	: "") + "";

    	let t12;
    	let a4_href_value;
    	let t13;
    	let p0;
    	let button0;
    	let t15;
    	let t16_value = "\n" + "";
    	let t16;
    	let t17;
    	let t18_value = "\n" + "";
    	let t18;
    	let t19;
    	let button1;
    	let t20;
    	let t21;
    	let t22;
    	let button2;
    	let t23;
    	let t24;
    	let t25;
    	let button3;
    	let t26;
    	let t27;
    	let t28;
    	let button4;
    	let t29;
    	let t30;
    	let t31;
    	let button5;
    	let t32;
    	let t33;
    	let t34;
    	let p1;
    	let t38;
    	let button6;
    	let t39;
    	let t40;
    	let t41;
    	let button7;
    	let t42;
    	let t43;
    	let t44;
    	let button8;
    	let t45;
    	let t46;
    	let t47;
    	let button9;
    	let t48;
    	let t49;
    	let t50;
    	let button10;
    	let t51;
    	let t52;
    	let t53;
    	let button11;
    	let t54;
    	let t55;
    	let t56;
    	let button12;
    	let t57;
    	let t58;
    	let t59;
    	let h2;
    	let t60;
    	let a5;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			t0 = text("Build a ");
    			span0 = element("span");
    			t1 = text(t1_value);
    			t2 = text(" for\n    ");
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = text("\n    with ");
    			t5 = text(t5_value);
    			t6 = space();
    			a0 = element("a");
    			t7 = text(t7_value);
    			t8 = space();
    			a1 = element("a");
    			t9 = text(t9_value);
    			a2 = element("a");
    			t10 = text(t10_value);
    			a3 = element("a");
    			t11 = text(t11_value);
    			a4 = element("a");
    			t12 = text(t12_value);
    			t13 = space();
    			p0 = element("p");
    			button0 = element("button");
    			button0.textContent = "Roll 🎲 For App";
    			t15 = space();
    			t16 = text(t16_value);
    			t17 = text("\n    Settings:\n    ");
    			t18 = text(t18_value);
    			t19 = space();
    			button1 = element("button");
    			t20 = text("Backend: ");
    			t21 = text(/*hasBackend*/ ctx[8]);
    			t22 = space();
    			button2 = element("button");
    			t23 = text("API Type: ");
    			t24 = text(/*hasAPI*/ ctx[9]);
    			t25 = space();
    			button3 = element("button");
    			t26 = text("Frontend Framework: ");
    			t27 = text(/*hasFrontend*/ ctx[10]);
    			t28 = space();
    			button4 = element("button");
    			t29 = text("Mobile: ");
    			t30 = text(/*hasMobile*/ ctx[11]);
    			t31 = space();
    			button5 = element("button");
    			t32 = text("Pick Database: ");
    			t33 = text(/*hasDatabase*/ ctx[7]);
    			t34 = space();
    			p1 = element("p");

    			p1.textContent = `${"\n"}
    Locks:
    ${"\n"}`;

    			t38 = space();
    			button6 = element("button");
    			t39 = text("Keep Idea: ");
    			t40 = text(/*lockIdea*/ ctx[13]);
    			t41 = space();
    			button7 = element("button");
    			t42 = text("Keep Audience: ");
    			t43 = text(/*lockAudience*/ ctx[12]);
    			t44 = space();
    			button8 = element("button");
    			t45 = text("Keep Backend: ");
    			t46 = text(/*lockBackend*/ ctx[15]);
    			t47 = space();
    			button9 = element("button");
    			t48 = text("Keep API Type: ");
    			t49 = text(/*lockAPI*/ ctx[16]);
    			t50 = space();
    			button10 = element("button");
    			t51 = text("Keep Frontend: ");
    			t52 = text(/*lockFrontend*/ ctx[17]);
    			t53 = space();
    			button11 = element("button");
    			t54 = text("Keep Mobile: ");
    			t55 = text(/*lockMobile*/ ctx[18]);
    			t56 = space();
    			button12 = element("button");
    			t57 = text("Keep Database: ");
    			t58 = text(/*lockDatabase*/ ctx[14]);
    			t59 = space();
    			h2 = element("h2");
    			t60 = text("Not seeing your favorite stack? Make a contribution on ");
    			a5 = element("a");
    			a5.textContent = "Github";
    			set_style(span0, "font-weight", "500");
    			add_location(span0, file, 98, 12, 2105);
    			set_style(span1, "font-weight", "500");
    			add_location(span1, file, 99, 4, 2172);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", a0_href_value = `https://github.com/search?ref=simplesearch&q=${/*backend*/ ctx[1][/*randomBackend*/ ctx[20]]}`);
    			attr_dev(a0, "class", "svelte-2hrgfj");
    			add_location(a0, file, 101, 4, 2259);
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", a1_href_value = `https://github.com/search?ref=simplesearch&q=${/*api*/ ctx[2][/*randomAPI*/ ctx[21]]}`);
    			attr_dev(a1, "class", "svelte-2hrgfj");
    			add_location(a1, file, 106, 4, 2440);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", a2_href_value = `https://github.com/search?ref=simplesearch&q=${/*frontend*/ ctx[3][/*randomFrontend*/ ctx[22]]}`);
    			attr_dev(a2, "class", "svelte-2hrgfj");
    			add_location(a2, file, 112, 5, 2656);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", a3_href_value = `https://github.com/search?ref=simplesearch&q=${/*mobile*/ ctx[4][/*randomMobile*/ ctx[23]]}`);
    			attr_dev(a3, "class", "svelte-2hrgfj");
    			add_location(a3, file, 116, 5, 2837);
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "href", a4_href_value = `https://github.com/search?ref=simplesearch&q=${/*database*/ ctx[0][/*randomDatabase*/ ctx[19]]}`);
    			attr_dev(a4, "class", "svelte-2hrgfj");
    			add_location(a4, file, 120, 5, 3008);
    			attr_dev(h1, "class", "svelte-2hrgfj");
    			add_location(h1, file, 97, 2, 2088);
    			set_style(button0, "background-color", "#7496db");
    			set_style(button0, "border-radius", "2px");
    			add_location(button0, file, 127, 4, 3208);
    			attr_dev(p0, "class", "svelte-2hrgfj");
    			add_location(p0, file, 126, 2, 3200);
    			add_location(button1, file, 135, 2, 3378);
    			add_location(button2, file, 139, 3, 3457);
    			add_location(button3, file, 143, 2, 3528);
    			add_location(button4, file, 146, 2, 3618);
    			add_location(button5, file, 149, 2, 3692);
    			attr_dev(p1, "class", "svelte-2hrgfj");
    			add_location(p1, file, 153, 2, 3778);
    			add_location(button6, file, 159, 2, 3825);
    			add_location(button7, file, 162, 2, 3900);
    			add_location(button8, file, 165, 2, 3987);
    			add_location(button9, file, 168, 2, 4071);
    			add_location(button10, file, 171, 2, 4148);
    			add_location(button11, file, 174, 2, 4235);
    			add_location(button12, file, 177, 2, 4316);
    			attr_dev(a5, "href", "https://github.com/jottenlips/stack-dice");
    			attr_dev(a5, "class", "svelte-2hrgfj");
    			add_location(a5, file, 182, 59, 4468);
    			attr_dev(h2, "class", "svelte-2hrgfj");
    			add_location(h2, file, 181, 2, 4404);
    			attr_dev(main, "class", "svelte-2hrgfj");
    			add_location(main, file, 96, 0, 2079);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(h1, t0);
    			append_dev(h1, span0);
    			append_dev(span0, t1);
    			append_dev(h1, t2);
    			append_dev(h1, span1);
    			append_dev(span1, t3);
    			append_dev(h1, t4);
    			append_dev(h1, t5);
    			append_dev(h1, t6);
    			append_dev(h1, a0);
    			append_dev(a0, t7);
    			append_dev(h1, t8);
    			append_dev(h1, a1);
    			append_dev(a1, t9);
    			append_dev(h1, a2);
    			append_dev(a2, t10);
    			append_dev(h1, a3);
    			append_dev(a3, t11);
    			append_dev(h1, a4);
    			append_dev(a4, t12);
    			append_dev(main, t13);
    			append_dev(main, p0);
    			append_dev(p0, button0);
    			append_dev(p0, t15);
    			append_dev(p0, t16);
    			append_dev(p0, t17);
    			append_dev(p0, t18);
    			append_dev(main, t19);
    			append_dev(main, button1);
    			append_dev(button1, t20);
    			append_dev(button1, t21);
    			append_dev(main, t22);
    			append_dev(main, button2);
    			append_dev(button2, t23);
    			append_dev(button2, t24);
    			append_dev(main, t25);
    			append_dev(main, button3);
    			append_dev(button3, t26);
    			append_dev(button3, t27);
    			append_dev(main, t28);
    			append_dev(main, button4);
    			append_dev(button4, t29);
    			append_dev(button4, t30);
    			append_dev(main, t31);
    			append_dev(main, button5);
    			append_dev(button5, t32);
    			append_dev(button5, t33);
    			append_dev(main, t34);
    			append_dev(main, p1);
    			append_dev(main, t38);
    			append_dev(main, button6);
    			append_dev(button6, t39);
    			append_dev(button6, t40);
    			append_dev(main, t41);
    			append_dev(main, button7);
    			append_dev(button7, t42);
    			append_dev(button7, t43);
    			append_dev(main, t44);
    			append_dev(main, button8);
    			append_dev(button8, t45);
    			append_dev(button8, t46);
    			append_dev(main, t47);
    			append_dev(main, button9);
    			append_dev(button9, t48);
    			append_dev(button9, t49);
    			append_dev(main, t50);
    			append_dev(main, button10);
    			append_dev(button10, t51);
    			append_dev(button10, t52);
    			append_dev(main, t53);
    			append_dev(main, button11);
    			append_dev(button11, t54);
    			append_dev(button11, t55);
    			append_dev(main, t56);
    			append_dev(main, button12);
    			append_dev(button12, t57);
    			append_dev(button12, t58);
    			append_dev(main, t59);
    			append_dev(main, h2);
    			append_dev(h2, t60);
    			append_dev(h2, a5);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*getRandomApp*/ ctx[38], false, false, false),
    					listen_dev(button1, "click", /*toggleHasBackend*/ ctx[27], false, false, false),
    					listen_dev(button2, "click", /*toggleHasAPI*/ ctx[28], false, false, false),
    					listen_dev(button3, "click", /*toggleHasFrontend*/ ctx[29], false, false, false),
    					listen_dev(button4, "click", /*toggleHasMobile*/ ctx[30], false, false, false),
    					listen_dev(button5, "click", /*toggleHasDatabase*/ ctx[26], false, false, false),
    					listen_dev(button6, "click", /*toggleLockIdea*/ ctx[32], false, false, false),
    					listen_dev(button7, "click", /*toggleLockAudience*/ ctx[31], false, false, false),
    					listen_dev(button8, "click", /*toggleLockBackend*/ ctx[34], false, false, false),
    					listen_dev(button9, "click", /*toggleLockAPI*/ ctx[35], false, false, false),
    					listen_dev(button10, "click", /*toggleLockFrontend*/ ctx[36], false, false, false),
    					listen_dev(button11, "click", /*toggleLockMobile*/ ctx[37], false, false, false),
    					listen_dev(button12, "click", /*toggleLockDatabase*/ ctx[33], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*ideas, randomIdea*/ 16777248 && t1_value !== (t1_value = /*ideas*/ ctx[5][/*randomIdea*/ ctx[24]] + "")) set_data_dev(t1, t1_value);
    			if (dirty[0] & /*audiences, randomAudience*/ 33554496 && t3_value !== (t3_value = /*audiences*/ ctx[6][/*randomAudience*/ ctx[25]] + "")) set_data_dev(t3, t3_value);

    			if (dirty[0] & /*hasBackend, backend, randomBackend*/ 1048834 && t7_value !== (t7_value = (/*hasBackend*/ ctx[8]
    			? `${/*backend*/ ctx[1][/*randomBackend*/ ctx[20]]}\n`
    			: "") + "")) set_data_dev(t7, t7_value);

    			if (dirty[0] & /*backend, randomBackend*/ 1048578 && a0_href_value !== (a0_href_value = `https://github.com/search?ref=simplesearch&q=${/*backend*/ ctx[1][/*randomBackend*/ ctx[20]]}`)) {
    				attr_dev(a0, "href", a0_href_value);
    			}

    			if (dirty[0] & /*hasFrontend, hasMobile, hasBackend, hasAPI, api, randomAPI*/ 2100996 && t9_value !== (t9_value = ((/*hasFrontend*/ ctx[10] || /*hasMobile*/ ctx[11]) && /*hasBackend*/ ctx[8] && /*hasAPI*/ ctx[9]
    			? `${/*api*/ ctx[2][/*randomAPI*/ ctx[21]]}\n`
    			: "") + "")) set_data_dev(t9, t9_value);

    			if (dirty[0] & /*api, randomAPI*/ 2097156 && a1_href_value !== (a1_href_value = `https://github.com/search?ref=simplesearch&q=${/*api*/ ctx[2][/*randomAPI*/ ctx[21]]}`)) {
    				attr_dev(a1, "href", a1_href_value);
    			}

    			if (dirty[0] & /*hasFrontend, frontend, randomFrontend*/ 4195336 && t10_value !== (t10_value = (/*hasFrontend*/ ctx[10]
    			? `${/*frontend*/ ctx[3][/*randomFrontend*/ ctx[22]]}\n`
    			: "") + "")) set_data_dev(t10, t10_value);

    			if (dirty[0] & /*frontend, randomFrontend*/ 4194312 && a2_href_value !== (a2_href_value = `https://github.com/search?ref=simplesearch&q=${/*frontend*/ ctx[3][/*randomFrontend*/ ctx[22]]}`)) {
    				attr_dev(a2, "href", a2_href_value);
    			}

    			if (dirty[0] & /*hasMobile, mobile, randomMobile*/ 8390672 && t11_value !== (t11_value = (/*hasMobile*/ ctx[11]
    			? `${/*mobile*/ ctx[4][/*randomMobile*/ ctx[23]]}\n`
    			: "") + "")) set_data_dev(t11, t11_value);

    			if (dirty[0] & /*mobile, randomMobile*/ 8388624 && a3_href_value !== (a3_href_value = `https://github.com/search?ref=simplesearch&q=${/*mobile*/ ctx[4][/*randomMobile*/ ctx[23]]}`)) {
    				attr_dev(a3, "href", a3_href_value);
    			}

    			if (dirty[0] & /*hasDatabase, database, randomDatabase*/ 524417 && t12_value !== (t12_value = (/*hasDatabase*/ ctx[7]
    			? `${/*database*/ ctx[0][/*randomDatabase*/ ctx[19]]}\n`
    			: "") + "")) set_data_dev(t12, t12_value);

    			if (dirty[0] & /*database, randomDatabase*/ 524289 && a4_href_value !== (a4_href_value = `https://github.com/search?ref=simplesearch&q=${/*database*/ ctx[0][/*randomDatabase*/ ctx[19]]}`)) {
    				attr_dev(a4, "href", a4_href_value);
    			}

    			if (dirty[0] & /*hasBackend*/ 256) set_data_dev(t21, /*hasBackend*/ ctx[8]);
    			if (dirty[0] & /*hasAPI*/ 512) set_data_dev(t24, /*hasAPI*/ ctx[9]);
    			if (dirty[0] & /*hasFrontend*/ 1024) set_data_dev(t27, /*hasFrontend*/ ctx[10]);
    			if (dirty[0] & /*hasMobile*/ 2048) set_data_dev(t30, /*hasMobile*/ ctx[11]);
    			if (dirty[0] & /*hasDatabase*/ 128) set_data_dev(t33, /*hasDatabase*/ ctx[7]);
    			if (dirty[0] & /*lockIdea*/ 8192) set_data_dev(t40, /*lockIdea*/ ctx[13]);
    			if (dirty[0] & /*lockAudience*/ 4096) set_data_dev(t43, /*lockAudience*/ ctx[12]);
    			if (dirty[0] & /*lockBackend*/ 32768) set_data_dev(t46, /*lockBackend*/ ctx[15]);
    			if (dirty[0] & /*lockAPI*/ 65536) set_data_dev(t49, /*lockAPI*/ ctx[16]);
    			if (dirty[0] & /*lockFrontend*/ 131072) set_data_dev(t52, /*lockFrontend*/ ctx[17]);
    			if (dirty[0] & /*lockMobile*/ 262144) set_data_dev(t55, /*lockMobile*/ ctx[18]);
    			if (dirty[0] & /*lockDatabase*/ 16384) set_data_dev(t58, /*lockDatabase*/ ctx[14]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { database } = $$props;
    	let { backend } = $$props;
    	let { api } = $$props;
    	let { frontend } = $$props;
    	let { mobile } = $$props;
    	let { ideas } = $$props;
    	let { audiences } = $$props;
    	let hasDatabase = false;
    	let hasBackend = true;
    	let hasAPI = false;
    	let hasFrontend = true;
    	let hasMobile = false;

    	const toggleHasDatabase = () => {
    		$$invalidate(7, hasDatabase = !hasDatabase);
    	};

    	const toggleHasBackend = () => {
    		$$invalidate(8, hasBackend = !hasBackend);
    	};

    	const toggleHasAPI = () => {
    		$$invalidate(9, hasAPI = !hasAPI);
    	};

    	const toggleHasFrontend = () => {
    		$$invalidate(10, hasFrontend = !hasFrontend);
    	};

    	const toggleHasMobile = () => {
    		$$invalidate(11, hasMobile = !hasMobile);
    	};

    	let lockAudience = false;
    	let lockIdea = false;
    	let lockDatabase = false;
    	let lockBackend = false;
    	let lockAPI = false;
    	let lockFrontend = false;
    	let lockMobile = false;

    	const toggleLockAudience = () => {
    		$$invalidate(12, lockAudience = !lockAudience);
    	};

    	const toggleLockIdea = () => {
    		$$invalidate(13, lockIdea = !lockIdea);
    	};

    	const toggleLockDatabase = () => {
    		$$invalidate(14, lockDatabase = !lockDatabase);
    	};

    	const toggleLockBackend = () => {
    		$$invalidate(15, lockBackend = !lockBackend);
    	};

    	const toggleLockAPI = () => {
    		$$invalidate(16, lockAPI = !lockAPI);
    	};

    	const toggleLockFrontend = () => {
    		$$invalidate(17, lockFrontend = !lockFrontend);
    	};

    	const toggleLockMobile = () => {
    		$$invalidate(18, lockMobile = !lockMobile);
    	};

    	let randomDatabase = 0;
    	let randomBackend = 0;
    	let randomAPI = 0;
    	let randomFrontend = 0;
    	let randomMobile = 0;
    	let randomIdea = 0;
    	let randomAudience = 0;

    	const getRandom = max => {
    		return Math.floor(Math.random() * max);
    	};

    	const getRandomApp = () => {
    		if (!lockDatabase) $$invalidate(19, randomDatabase = getRandom(database.length));
    		if (!lockBackend) $$invalidate(20, randomBackend = getRandom(backend.length));
    		if (!lockBackend) $$invalidate(21, randomAPI = getRandom(api.length));
    		if (!lockFrontend) $$invalidate(22, randomFrontend = getRandom(frontend.length));
    		if (!lockMobile) $$invalidate(23, randomMobile = getRandom(mobile.length));
    		if (!lockIdea) $$invalidate(24, randomIdea = getRandom(ideas.length));
    		if (!lockAudience) $$invalidate(25, randomAudience = getRandom(audiences.length));
    	};

    	getRandomApp();
    	const writable_props = ['database', 'backend', 'api', 'frontend', 'mobile', 'ideas', 'audiences'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('database' in $$props) $$invalidate(0, database = $$props.database);
    		if ('backend' in $$props) $$invalidate(1, backend = $$props.backend);
    		if ('api' in $$props) $$invalidate(2, api = $$props.api);
    		if ('frontend' in $$props) $$invalidate(3, frontend = $$props.frontend);
    		if ('mobile' in $$props) $$invalidate(4, mobile = $$props.mobile);
    		if ('ideas' in $$props) $$invalidate(5, ideas = $$props.ideas);
    		if ('audiences' in $$props) $$invalidate(6, audiences = $$props.audiences);
    	};

    	$$self.$capture_state = () => ({
    		database,
    		backend,
    		api,
    		frontend,
    		mobile,
    		ideas,
    		audiences,
    		hasDatabase,
    		hasBackend,
    		hasAPI,
    		hasFrontend,
    		hasMobile,
    		toggleHasDatabase,
    		toggleHasBackend,
    		toggleHasAPI,
    		toggleHasFrontend,
    		toggleHasMobile,
    		lockAudience,
    		lockIdea,
    		lockDatabase,
    		lockBackend,
    		lockAPI,
    		lockFrontend,
    		lockMobile,
    		toggleLockAudience,
    		toggleLockIdea,
    		toggleLockDatabase,
    		toggleLockBackend,
    		toggleLockAPI,
    		toggleLockFrontend,
    		toggleLockMobile,
    		randomDatabase,
    		randomBackend,
    		randomAPI,
    		randomFrontend,
    		randomMobile,
    		randomIdea,
    		randomAudience,
    		getRandom,
    		getRandomApp
    	});

    	$$self.$inject_state = $$props => {
    		if ('database' in $$props) $$invalidate(0, database = $$props.database);
    		if ('backend' in $$props) $$invalidate(1, backend = $$props.backend);
    		if ('api' in $$props) $$invalidate(2, api = $$props.api);
    		if ('frontend' in $$props) $$invalidate(3, frontend = $$props.frontend);
    		if ('mobile' in $$props) $$invalidate(4, mobile = $$props.mobile);
    		if ('ideas' in $$props) $$invalidate(5, ideas = $$props.ideas);
    		if ('audiences' in $$props) $$invalidate(6, audiences = $$props.audiences);
    		if ('hasDatabase' in $$props) $$invalidate(7, hasDatabase = $$props.hasDatabase);
    		if ('hasBackend' in $$props) $$invalidate(8, hasBackend = $$props.hasBackend);
    		if ('hasAPI' in $$props) $$invalidate(9, hasAPI = $$props.hasAPI);
    		if ('hasFrontend' in $$props) $$invalidate(10, hasFrontend = $$props.hasFrontend);
    		if ('hasMobile' in $$props) $$invalidate(11, hasMobile = $$props.hasMobile);
    		if ('lockAudience' in $$props) $$invalidate(12, lockAudience = $$props.lockAudience);
    		if ('lockIdea' in $$props) $$invalidate(13, lockIdea = $$props.lockIdea);
    		if ('lockDatabase' in $$props) $$invalidate(14, lockDatabase = $$props.lockDatabase);
    		if ('lockBackend' in $$props) $$invalidate(15, lockBackend = $$props.lockBackend);
    		if ('lockAPI' in $$props) $$invalidate(16, lockAPI = $$props.lockAPI);
    		if ('lockFrontend' in $$props) $$invalidate(17, lockFrontend = $$props.lockFrontend);
    		if ('lockMobile' in $$props) $$invalidate(18, lockMobile = $$props.lockMobile);
    		if ('randomDatabase' in $$props) $$invalidate(19, randomDatabase = $$props.randomDatabase);
    		if ('randomBackend' in $$props) $$invalidate(20, randomBackend = $$props.randomBackend);
    		if ('randomAPI' in $$props) $$invalidate(21, randomAPI = $$props.randomAPI);
    		if ('randomFrontend' in $$props) $$invalidate(22, randomFrontend = $$props.randomFrontend);
    		if ('randomMobile' in $$props) $$invalidate(23, randomMobile = $$props.randomMobile);
    		if ('randomIdea' in $$props) $$invalidate(24, randomIdea = $$props.randomIdea);
    		if ('randomAudience' in $$props) $$invalidate(25, randomAudience = $$props.randomAudience);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		database,
    		backend,
    		api,
    		frontend,
    		mobile,
    		ideas,
    		audiences,
    		hasDatabase,
    		hasBackend,
    		hasAPI,
    		hasFrontend,
    		hasMobile,
    		lockAudience,
    		lockIdea,
    		lockDatabase,
    		lockBackend,
    		lockAPI,
    		lockFrontend,
    		lockMobile,
    		randomDatabase,
    		randomBackend,
    		randomAPI,
    		randomFrontend,
    		randomMobile,
    		randomIdea,
    		randomAudience,
    		toggleHasDatabase,
    		toggleHasBackend,
    		toggleHasAPI,
    		toggleHasFrontend,
    		toggleHasMobile,
    		toggleLockAudience,
    		toggleLockIdea,
    		toggleLockDatabase,
    		toggleLockBackend,
    		toggleLockAPI,
    		toggleLockFrontend,
    		toggleLockMobile,
    		getRandomApp
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance,
    			create_fragment,
    			safe_not_equal,
    			{
    				database: 0,
    				backend: 1,
    				api: 2,
    				frontend: 3,
    				mobile: 4,
    				ideas: 5,
    				audiences: 6
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*database*/ ctx[0] === undefined && !('database' in props)) {
    			console.warn("<App> was created without expected prop 'database'");
    		}

    		if (/*backend*/ ctx[1] === undefined && !('backend' in props)) {
    			console.warn("<App> was created without expected prop 'backend'");
    		}

    		if (/*api*/ ctx[2] === undefined && !('api' in props)) {
    			console.warn("<App> was created without expected prop 'api'");
    		}

    		if (/*frontend*/ ctx[3] === undefined && !('frontend' in props)) {
    			console.warn("<App> was created without expected prop 'frontend'");
    		}

    		if (/*mobile*/ ctx[4] === undefined && !('mobile' in props)) {
    			console.warn("<App> was created without expected prop 'mobile'");
    		}

    		if (/*ideas*/ ctx[5] === undefined && !('ideas' in props)) {
    			console.warn("<App> was created without expected prop 'ideas'");
    		}

    		if (/*audiences*/ ctx[6] === undefined && !('audiences' in props)) {
    			console.warn("<App> was created without expected prop 'audiences'");
    		}
    	}

    	get database() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set database(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backend() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backend(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get api() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set api(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get frontend() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set frontend(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mobile() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mobile(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ideas() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ideas(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get audiences() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set audiences(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            database: ['Postgresql', "MongoDB", 'DynamoDB', 'MySQL', 'Neo4j', 'Redis'],
            backend: ['Ruby on Rails', 'Django', 'Serverless Cloud', 'Meteor.js', 'Flask', 'Sinatra', 'FastAPI', 'Supabase', ],
            api: ['GraphQL', 'REST'],
            frontend: ['React', 'Svelte', 'Vue', 'Vanilla.js'],
            mobile: ['React Native', 'Flutter', 'Kotlin Multiplatform', 'Swift/Xcode', 'Java/Android Studio', 'PWA', "Expo"],
            ideas: ['Chat App', 'Game', 'Schedule App', 'Marketplace', "Blogsphere", "Map Application", 'Reccomendation Engine', 'Bulletin Board', 'Edu-tainment Platform', "Command Line Interface", "Twitter Bot", "Twilio Bot", "Reddit Bot", "Media Player", "RPG Game", "Musical Instrument", "Kanban Board", "Email Organizer", "Avatar Generator", "Content Management System", "Massively multiplayer online game", "Sidescroller Game", "Data Visualization Dashboard", "Swipe Left/Right App", "Habit Tracker"],
            audiences: ['Cat Owners', 'Coffee Addicts', 'Cooks', 'Book Lovers', 'Board Game Enthusiast', 'Movie Nerds', 'Gym Rats', 'Skaters', "Car Lovers", "Gamers", "Gardeners", "Metal Workers", "Animal Rights Activists", "Remote Learning", "Rock Climbers", "Dog Trainers", "Personal Trainers", "Pokemon Trainers", "Arborists", "Wookies", "Grateful Dead Heads", "Electronic Musicians", "Lego Builders", "Artists", "Painters", "Javascript Developers", "Web Developers", "Mobile Developers", "VSCode Users", "Music Festival Goers", "Hair Stylists", "Doctors", "Data Scientists", "Data Analysts", "Fast Food Junkies", "Insomniacs", "Cyclists", "Families", "Vegans", "Snowboarders", "Tennis Players", "Indie Musicians", "Weight Lifters", "Home Aqauriums", "Recipes", "Home Decorators", "Landscape Architects", "Beer Drinkers", "Wine Snobs", "Car Maintenance"]
        }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
