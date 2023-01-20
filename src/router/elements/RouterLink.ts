import { normalizePath, ROUTER_EVENTS_BUS } from '../utils';


customElements.define(
  'router-link',
  class RouterLink extends HTMLAnchorElement {
    static get observedAttributes(): string[] {
      return ['href', 'link-active'];
    }

    #href = '';
    #linkActive = '';
    #clickListener: EventListenerObject = {
      handleEvent: (event: MouseEvent) => this.#onClick(event),
    };
    #activateListener: EventListenerObject = {
      handleEvent: (event: CustomEvent<URL>) => this.#onActivate(event),
    };

    constructor() {
      super();
      this.href = this.getAttribute('href')!;
      this.linkActive = this.getAttribute('link-active')!;
    }

    get href(): string {
      return this.#href;
    }

    set href(value: string) {
      this.#href = normalizePath(location.href, value).href;
    }

    get linkActive(): string {
      return this.#linkActive;
    }

    set linkActive(value: string) {
      this.#linkActive = value;
    }

    connectedCallback(): void {
      this.addEventListener('click', this.#clickListener);
      ROUTER_EVENTS_BUS.addEventListener('activate', this.#activateListener);
    }

    disconnectedCallback(): void {
      this.removeEventListener('click', this.#clickListener);
      ROUTER_EVENTS_BUS.removeEventListener('activate', this.#activateListener);
    }

    attributeChangedCallback(_attrName: string, _oldValue: string, newValue: string): void {
      this.linkActive = newValue;
    }

    #onClick(event: MouseEvent): void {
      const path = new URL(this.href).pathname;

      event.preventDefault();
      ROUTER_EVENTS_BUS.dispatchEvent(new CustomEvent<string>('linkNavigation', {
        detail: path,
      }));
    }

    #onActivate({ detail: url }: CustomEvent<URL>) {
      this.#linkActive && this.classList.toggle(this.#linkActive, url.href === this.href);
    }

  },
  { extends: 'a' },
);