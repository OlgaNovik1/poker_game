import { ROUTER_EVENTS_BUS, normalizePath } from '../utils';


customElements.define(
  'router-button',
  class RouterLink extends HTMLButtonElement {
    static get observedAttributes(): string[] {
      return ['link-active', 'href'];
    }

    #href = '';
    #linkActive = '';
    #clickListener: EventListenerObject = {
      handleEvent: () => this.#onClick(),
    };
    #activateListener: EventListenerObject = {
      handleEvent: (event: CustomEvent<URL>) => this.#onActivate(event),
    };

    constructor() {
      super();
      this.type = 'button';
      this.href = this.getAttribute('href')!;
      this.linkActive = this.getAttribute('link-active')!;
    }

    get linkActive(): string {
      return this.#linkActive;
    }

    set linkActive(value: string) {
      this.#linkActive = value;
    }

    get href(): string {
      return this.#href;
    }

    set href(value: string) {
      this.#href = normalizePath(location.href, value).href;
    }

    connectedCallback(): void {
      this.addEventListener('click', this.#clickListener);
      ROUTER_EVENTS_BUS.addEventListener('activate', this.#activateListener);
    }

    disconnectedCallback(): void {
      this.removeEventListener('click', this.#clickListener);
      ROUTER_EVENTS_BUS.removeEventListener('activate', this.#activateListener);
    }

    attributeChangedCallback(attrName: 'href' | 'link-active', _oldValue: string, newValue: string): void {
      switch (attrName) {
      case 'href':
        return void (
          this.linkActive = newValue
        );
      case 'link-active':
        return void (
          this.linkActive = newValue
        );
      }
    }

    #onClick(): void {
      if (this.disabled) {
        return;
      }

      const path = new URL(this.href).pathname;

      ROUTER_EVENTS_BUS.dispatchEvent(new CustomEvent<string>('linkNavigation', {
        detail: path,
      }));
    }

    #onActivate({ detail: url }: CustomEvent<URL>) {
      this.#linkActive && this.classList.toggle(this.#linkActive, url.href === this.href);
    }

  },
  { extends: 'button' },
);