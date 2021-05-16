import { BaseItem } from "../game/base_item";
import { ClickDetector } from "./click_detector";
import { Signal } from "./signal";

/*
 * ***************************************************
 *
 *  LEGACY CODE WARNING
 *
 *  This is old code from yorg3.io and needs to be refactored
 *  @TODO
 *
 * ***************************************************
 */

export class FormElement {
    constructor(id, label) {
        this.id = id;
        this.label = label;

        this.valueChosen = new Signal();
    }

    getHtml() {
        abstract;
        return "";
    }

    getFormElement(parent) {
        return parent.querySelector("[data-formId='" + this.id + "']");
    }

    bindEvents(parent, clickTrackers) {
        abstract;
    }

    focus() {}

    isValid() {
        return true;
    }

    /** @returns {any} */
    getValue() {
        abstract;
    }
}

export class FormElementInput extends FormElement {
    constructor({ id, label = null, placeholder, defaultValue = "", inputType = "text", validator = null }) {
        super(id, label);
        this.placeholder = placeholder;
        this.defaultValue = defaultValue;
        this.inputType = inputType;
        this.validator = validator;

        this.element = null;
    }

    getHtml() {
        let classes = [];
        let inputType = "text";
        let maxlength = 256;
        switch (this.inputType) {
            case "text": {
                classes.push("input-text");
                break;
            }

            case "email": {
                classes.push("input-email");
                inputType = "email";
                break;
            }

            case "token": {
                classes.push("input-token");
                inputType = "text";
                maxlength = 4;
                break;
            }
        }

        return `
            <div class="formElement input">
                ${this.label ? `<label>${this.label}</label>` : ""}
                <input
                    type="${inputType}"
                    value="${this.defaultValue.replace(/["\\]+/gi, "")}"
                    maxlength="${maxlength}"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    class="${classes.join(" ")}"
                    placeholder="${this.placeholder.replace(/["\\]+/gi, "")}"
                    data-formId="${this.id}">
            </div>
        `;
    }

    bindEvents(parent, clickTrackers) {
        this.element = this.getFormElement(parent);
        this.element.addEventListener("input", event => this.updateErrorState());
        this.updateErrorState();
    }

    updateErrorState() {
        this.element.classList.toggle("errored", !this.isValid());
    }

    isValid() {
        return !this.validator || this.validator(this.element.value);
    }

    getValue() {
        return this.element.value;
    }

    setValue(value) {
        this.element.value = value;
        this.updateErrorState();
    }

    focus() {
        this.element.focus();
    }
}

export class FormElementCheckbox extends FormElement {
    constructor({ id, label, defaultValue = true }) {
        super(id, label);
        this.defaultValue = defaultValue;
        this.value = this.defaultValue;

        this.element = null;
    }

    getHtml() {
        return `
            <div class="formElement checkBoxFormElem">
            ${this.label ? `<label>${this.label}</label>` : ""}
                <div class="checkbox ${this.defaultValue ? "checked" : ""}" data-formId='${this.id}'>
                    <span class="knob"></span >
                </div >
            </div>
        `;
    }

    bindEvents(parent, clickTrackers) {
        this.element = this.getFormElement(parent);
        const detector = new ClickDetector(this.element, {
            consumeEvents: false,
            preventDefault: false,
        });
        clickTrackers.push(detector);
        detector.click.add(this.toggle, this);
    }

    getValue() {
        return this.value;
    }

    toggle() {
        this.value = !this.value;
        this.element.classList.toggle("checked", this.value);
    }

    focus(parent) {}
}

export class FormElementItemChooser extends FormElement {
    /**
     *
     * @param {object} param0
     * @param {string} param0.id
     * @param {string=} param0.label
     * @param {Array<BaseItem>} param0.items
     */
    constructor({ id, label, items = [] }) {
        super(id, label);
        this.items = items;
        this.element = null;

        /**
         * @type {BaseItem}
         */
        this.chosenItem = null;
    }

    getHtml() {
        let classes = [];

        return `
            <div class="formElement">
                ${this.label ? `<label>${this.label}</label>` : ""}
                <div class="ingameItemChooser input" data-formId="${this.id}"></div>
            </div>
            `;
    }

    /**
     * @param {HTMLElement} parent
     * @param {Array<ClickDetector>} clickTrackers
     */
    bindEvents(parent, clickTrackers) {
        this.element = this.getFormElement(parent);

        for (let i = 0; i < this.items.length; ++i) {
            const item = this.items[i];

            const canvas = document.createElement("canvas");
            canvas.width = 128;
            canvas.height = 128;
            const context = canvas.getContext("2d");
            item.drawFullSizeOnCanvas(context, 128);
            this.element.appendChild(canvas);

            const detector = new ClickDetector(canvas, {});
            clickTrackers.push(detector);
            detector.click.add(() => {
                this.chosenItem = item;
                this.valueChosen.dispatch(item);
            });
        }
    }

    isValid() {
        return true;
    }

    getValue() {
        return null;
    }

    focus() {}
}

export class FormElementOptionsChooser extends FormElement {
    /**
     * @param {object} param0
     * @param {string} param0.id
     * @param {string=} param0.label
     * @param {Array<any>} param0.options
     */
    constructor({ id, label, options = [] }) {
        super(id, label);
        this.options = options;
        this.element = null;

        /**
         * @type {Array<string>}
         */
        this.valuesChosen = [];
    }

    getHtml() {
        let classes = [];

        let html = `<div class="formElement">
                        ${this.label ? `<label>${this.label}</label>` : ""}
                        <div class='optionParent' data-formId="${this.id}">
                   `;

        this.options.forEach(({ value, text, desc = null, iconPrefix = null }) => {
            const descHtml = desc ? `<span class="desc">${desc}</span>` : "";
            let iconHtml = iconPrefix ? `<span class="icon icon-${iconPrefix}-${value}"></span>` : "";
            html += `
                <div class='option ${this.valuesChosen.includes(value) ? "active" : ""} ${
                iconPrefix ? "hasIcon" : ""
            }' data-optionvalue='${value}'>
                    ${iconHtml}
                    <span class='title'>${text}</span>
                    ${descHtml}
                </div>
                `;
        });

        html += "</div></div>";

        return html;
    }

    /**
     * @param {HTMLElement} parent
     * @param {Array<ClickDetector>} clickTrackers
     */
    bindEvents(parent, clickTrackers) {
        this.element = this.getFormElement(parent);

        const dialogElem = this.element.closest(".dialogInner");
        if (dialogElem) dialogElem.classList.add("optionChooserDialog");

        this.element.querySelectorAll("[data-optionvalue]").forEach(handle => {
            const value = handle.getAttribute("data-optionvalue");
            if (!handle) {
                return;
            }
            // Need click detector here to forward elements, otherwise scrolling does not work
            const detector = new ClickDetector(handle, {
                consumeEvents: false,
                preventDefault: false,
                clickSound: null,
                applyCssClass: "pressedOption",
                targetOnly: true,
            });

            clickTrackers.push(detector);

            detector.click.add(() => {
                if (this.valuesChosen.includes(value)) {
                    handle.classList.remove("active");
                    this.valuesChosen.splice(this.valuesChosen.indexOf(value));
                } else {
                    handle.classList.add("active");
                    this.valuesChosen.push(value);
                }
            });
        });
    }

    isValid() {
        return true;
    }

    getValue() {
        return this.valuesChosen;
    }

    focus() {}
}
