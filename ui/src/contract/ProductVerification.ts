import { Field, SmartContract, state, State, method, Bool } from 'o1js';

export class ProductVerification extends SmartContract {
    @state(Field) serialNumber = State<Field>()
    @state(Bool) verified = State<Bool>();

    init() {
        super.init();
        this.serialNumber.set(Field(0))
        this.verified.set(Bool(false))
    }

    @method async verifyProduct(status: Bool) {
        const verifyState = this.verified.get();
        this.verified.requireEquals(verifyState)
        status.assertEquals(verifyState)
        this.verified.set(status)
    }
}