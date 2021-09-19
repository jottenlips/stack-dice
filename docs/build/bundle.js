
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
    	let t1_value = /*ideas*/ ctx[2][/*randomIdea*/ ctx[6]] + "";
    	let t1;
    	let t2;
    	let t3_value = /*topics*/ ctx[3][/*randomTopic*/ ctx[7]] + "";
    	let t3;
    	let t4;

    	let t5_value = (/*hasBackend*/ ctx[8]
    	? `${/*backend*/ ctx[0][/*randomBackend*/ ctx[4]]}, `
    	: "") + "";

    	let t5;

    	let t6_value = (/*hasAPI*/ ctx[9] || /*hasMobile*/ ctx[11]
    	? `${/*api*/ ctx[1][/*randomAPI*/ ctx[5]]}, `
    	: "") + "";

    	let t6;
    	let t7;
    	let button0;
    	let t9;
    	let button1;
    	let t10;
    	let t11;
    	let t12;
    	let button2;
    	let t13;
    	let t14;
    	let t15;
    	let button3;
    	let t16;
    	let t17;
    	let t18;
    	let button4;
    	let t19;
    	let t20;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			t0 = text("Build a ");
    			t1 = text(t1_value);
    			t2 = text(" for ");
    			t3 = text(t3_value);
    			t4 = text(" with ");
    			t5 = text(t5_value);
    			t6 = text(t6_value);
    			t7 = space();
    			button0 = element("button");
    			button0.textContent = "Roll Dice For App";
    			t9 = space();
    			button1 = element("button");
    			t10 = text("Backend: ");
    			t11 = text(/*hasBackend*/ ctx[8]);
    			t12 = space();
    			button2 = element("button");
    			t13 = text("API: ");
    			t14 = text(/*hasAPI*/ ctx[9]);
    			t15 = space();
    			button3 = element("button");
    			t16 = text("Frontend: ");
    			t17 = text(/*hasFrontend*/ ctx[10]);
    			t18 = space();
    			button4 = element("button");
    			t19 = text("Mobile: ");
    			t20 = text(/*hasMobile*/ ctx[11]);
    			attr_dev(h1, "class", "svelte-1e9puaw");
    			add_location(h1, file, 49, 2, 1055);
    			add_location(button0, file, 54, 2, 1245);
    			add_location(button1, file, 55, 2, 1306);
    			add_location(button2, file, 59, 2, 1384);
    			add_location(button3, file, 62, 2, 1449);
    			add_location(button4, file, 65, 2, 1529);
    			attr_dev(main, "class", "svelte-1e9puaw");
    			add_location(main, file, 48, 0, 1046);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			append_dev(h1, t2);
    			append_dev(h1, t3);
    			append_dev(h1, t4);
    			append_dev(h1, t5);
    			append_dev(h1, t6);
    			append_dev(main, t7);
    			append_dev(main, button0);
    			append_dev(main, t9);
    			append_dev(main, button1);
    			append_dev(button1, t10);
    			append_dev(button1, t11);
    			append_dev(main, t12);
    			append_dev(main, button2);
    			append_dev(button2, t13);
    			append_dev(button2, t14);
    			append_dev(main, t15);
    			append_dev(main, button3);
    			append_dev(button3, t16);
    			append_dev(button3, t17);
    			append_dev(main, t18);
    			append_dev(main, button4);
    			append_dev(button4, t19);
    			append_dev(button4, t20);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*getRandomApp*/ ctx[12], false, false, false),
    					listen_dev(button1, "click", /*toggleHasBackend*/ ctx[13], false, false, false),
    					listen_dev(button2, "click", /*toggleHasAPI*/ ctx[14], false, false, false),
    					listen_dev(button3, "click", /*toggleHasFrontend*/ ctx[15], false, false, false),
    					listen_dev(button4, "click", /*toggleHasMobile*/ ctx[16], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*ideas, randomIdea*/ 68 && t1_value !== (t1_value = /*ideas*/ ctx[2][/*randomIdea*/ ctx[6]] + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*topics, randomTopic*/ 136 && t3_value !== (t3_value = /*topics*/ ctx[3][/*randomTopic*/ ctx[7]] + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*hasBackend, backend, randomBackend*/ 273 && t5_value !== (t5_value = (/*hasBackend*/ ctx[8]
    			? `${/*backend*/ ctx[0][/*randomBackend*/ ctx[4]]}, `
    			: "") + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*hasAPI, hasMobile, api, randomAPI*/ 2594 && t6_value !== (t6_value = (/*hasAPI*/ ctx[9] || /*hasMobile*/ ctx[11]
    			? `${/*api*/ ctx[1][/*randomAPI*/ ctx[5]]}, `
    			: "") + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*hasBackend*/ 256) set_data_dev(t11, /*hasBackend*/ ctx[8]);
    			if (dirty & /*hasAPI*/ 512) set_data_dev(t14, /*hasAPI*/ ctx[9]);
    			if (dirty & /*hasFrontend*/ 1024) set_data_dev(t17, /*hasFrontend*/ ctx[10]);
    			if (dirty & /*hasMobile*/ 2048) set_data_dev(t20, /*hasMobile*/ ctx[11]);
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
    	let { backend } = $$props;
    	let { api } = $$props;
    	let { frontend } = $$props;
    	let { mobile } = $$props;
    	let { ideas } = $$props;
    	let { topics } = $$props;
    	let randomBackend = 0;
    	let randomAPI = 0;
    	let randomFrontend = 0;
    	let randomMobile = 0;
    	let randomIdea = 0;
    	let randomTopic = 0;

    	const getRandom = max => {
    		return Math.floor(Math.randomBackend() * max);
    	};

    	const getRandomApp = () => {
    		$$invalidate(4, randomBackend = getRandom(backend.length));
    		$$invalidate(5, randomAPI = getRandom(api.length));
    		randomFrontend = getRandom(frontend.length);
    		randomMobile = getRandom(mobile.length);
    		$$invalidate(6, randomIdea = getRandom(ideas.length));
    		$$invalidate(7, randomTopic = getRandom(topics.length));
    	};

    	let hasBackend = true;
    	let hasAPI = true;
    	let hasFrontend = true;
    	let hasMobile = false;

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

    	const writable_props = ['backend', 'api', 'frontend', 'mobile', 'ideas', 'topics'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('backend' in $$props) $$invalidate(0, backend = $$props.backend);
    		if ('api' in $$props) $$invalidate(1, api = $$props.api);
    		if ('frontend' in $$props) $$invalidate(17, frontend = $$props.frontend);
    		if ('mobile' in $$props) $$invalidate(18, mobile = $$props.mobile);
    		if ('ideas' in $$props) $$invalidate(2, ideas = $$props.ideas);
    		if ('topics' in $$props) $$invalidate(3, topics = $$props.topics);
    	};

    	$$self.$capture_state = () => ({
    		backend,
    		api,
    		frontend,
    		mobile,
    		ideas,
    		topics,
    		randomBackend,
    		randomAPI,
    		randomFrontend,
    		randomMobile,
    		randomIdea,
    		randomTopic,
    		getRandom,
    		getRandomApp,
    		hasBackend,
    		hasAPI,
    		hasFrontend,
    		hasMobile,
    		toggleHasBackend,
    		toggleHasAPI,
    		toggleHasFrontend,
    		toggleHasMobile
    	});

    	$$self.$inject_state = $$props => {
    		if ('backend' in $$props) $$invalidate(0, backend = $$props.backend);
    		if ('api' in $$props) $$invalidate(1, api = $$props.api);
    		if ('frontend' in $$props) $$invalidate(17, frontend = $$props.frontend);
    		if ('mobile' in $$props) $$invalidate(18, mobile = $$props.mobile);
    		if ('ideas' in $$props) $$invalidate(2, ideas = $$props.ideas);
    		if ('topics' in $$props) $$invalidate(3, topics = $$props.topics);
    		if ('randomBackend' in $$props) $$invalidate(4, randomBackend = $$props.randomBackend);
    		if ('randomAPI' in $$props) $$invalidate(5, randomAPI = $$props.randomAPI);
    		if ('randomFrontend' in $$props) randomFrontend = $$props.randomFrontend;
    		if ('randomMobile' in $$props) randomMobile = $$props.randomMobile;
    		if ('randomIdea' in $$props) $$invalidate(6, randomIdea = $$props.randomIdea);
    		if ('randomTopic' in $$props) $$invalidate(7, randomTopic = $$props.randomTopic);
    		if ('hasBackend' in $$props) $$invalidate(8, hasBackend = $$props.hasBackend);
    		if ('hasAPI' in $$props) $$invalidate(9, hasAPI = $$props.hasAPI);
    		if ('hasFrontend' in $$props) $$invalidate(10, hasFrontend = $$props.hasFrontend);
    		if ('hasMobile' in $$props) $$invalidate(11, hasMobile = $$props.hasMobile);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		backend,
    		api,
    		ideas,
    		topics,
    		randomBackend,
    		randomAPI,
    		randomIdea,
    		randomTopic,
    		hasBackend,
    		hasAPI,
    		hasFrontend,
    		hasMobile,
    		getRandomApp,
    		toggleHasBackend,
    		toggleHasAPI,
    		toggleHasFrontend,
    		toggleHasMobile,
    		frontend,
    		mobile
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			backend: 0,
    			api: 1,
    			frontend: 17,
    			mobile: 18,
    			ideas: 2,
    			topics: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*backend*/ ctx[0] === undefined && !('backend' in props)) {
    			console.warn("<App> was created without expected prop 'backend'");
    		}

    		if (/*api*/ ctx[1] === undefined && !('api' in props)) {
    			console.warn("<App> was created without expected prop 'api'");
    		}

    		if (/*frontend*/ ctx[17] === undefined && !('frontend' in props)) {
    			console.warn("<App> was created without expected prop 'frontend'");
    		}

    		if (/*mobile*/ ctx[18] === undefined && !('mobile' in props)) {
    			console.warn("<App> was created without expected prop 'mobile'");
    		}

    		if (/*ideas*/ ctx[2] === undefined && !('ideas' in props)) {
    			console.warn("<App> was created without expected prop 'ideas'");
    		}

    		if (/*topics*/ ctx[3] === undefined && !('topics' in props)) {
    			console.warn("<App> was created without expected prop 'topics'");
    		}
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

    	get topics() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topics(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            backend: ['Ruby on Rails', 'Django', 'Serverless Cloud', 'Meteor', 'Flask', 'Sinatra', 'FastAPI'],
            api: ['GraphQL', 'REST'],
            frontend: ['React', 'Svelte', 'Vue', 'Vanilla'],
            mobile: ['React Native', 'Flutter', 'Kotlin Multiplatform', 'Swift/Xcode', 'Java/Android Studio', 'PWA'],
            ideas: ['Chat App', 'Game', ''],
            topics: ['Cats', 'Coffee', 'Cooking']
        }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
