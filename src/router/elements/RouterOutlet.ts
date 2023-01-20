import { ROUTER_EVENTS_BUS } from '../utils';


customElements.define(
  'router-outlet',
  class RouterOutletElement extends HTMLElement {
    readonly #preloader: Element | null;
    readonly #listener = {
      handleEvent: (event: CustomEvent) => {
        switch (event.type) {
        case 'render': return this.#onRender(event);
        case 'loadstart': return this.#onLoadStart();
        case 'loadend': return this.#onLoadEnd();
        }
      },
    };

    constructor() {
      super();
      this.#preloader = this.firstElementChild;
    }

    connectedCallback (): void {
      ROUTER_EVENTS_BUS.addEventListener('render', this.#listener);
      ROUTER_EVENTS_BUS.addEventListener('loadstart', this.#listener);
      ROUTER_EVENTS_BUS.addEventListener('loadend', this.#listener);
    }

    disconnectedCallback (): void {
      ROUTER_EVENTS_BUS.removeEventListener('render', this.#listener);
      ROUTER_EVENTS_BUS.removeEventListener('loadstart', this.#listener);
      ROUTER_EVENTS_BUS.removeEventListener('loadend', this.#listener);
    }

    #onRender({ detail }: CustomEvent<Element | DocumentFragment>): void {
      this.innerHTML = '';
      this.append(detail);
    }

    #onLoadStart(): void {
      if (this.#preloader) {
        this.append(this.#preloader);
      }
    }

    #onLoadEnd(): void {
      this.#preloader?.remove();
    }

  },
);