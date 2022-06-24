import React from "react";
import classnames from "classnames";
import {Button, Card} from "../../components";
import {Form, FormControl, Input, useForm, Validators} from "../../components/ReactiveForm";

export type IFilterForm = {
  name: FormControl;
  email: FormControl;
  message: FormControl;
}

const Contact = () => {
  const [form] = useForm<IFilterForm>({
    name: new FormControl('', [Validators.required()]),
    email: new FormControl('', [Validators.required(), Validators.email()]),
    message: new FormControl('', [Validators.required()]),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full sm:max-w-128 h-full flex flex-col justify-center self-center mx-auto">
      <h2 className="text-2xl font-semibold uppercase mb-2">Get in Touch</h2>
      <p className="text-sm mb-8">
        Trysail transom furl Sea Legs scallywag Jack Ketch chandler mizzenmast reef sails skysail.
        Shiver me timers loot bucko belaying pin Sea Legs boom gunwalls booty jury mast fore.
      </p>

      <Card>
        <Form className="grid grid-cols-12 gap-4" formGroup={form} onSubmit={onSubmit}>
          <Input
            control={form.controls.name}
            label="Name"
            containerClass="col-span-12 md:col-span-6 mb-2"
            labelClass="text-xs"
            inputClass="text-sm"
            fullWidth
            required
          />

          <Input
            control={form.controls.email}
            label="Email Address"
            containerClass="col-span-12 md:col-span-6 mb-2"
            labelClass="text-xs"
            inputClass="text-sm"
            fullWidth
            required
          />

          <Input
            control={form.controls.message}
            type="textarea"
            label="Message"
            containerClass="col-span-12"
            labelClass="text-xs"
            inputClass="text-sm"
            minRows={4}
            fullWidth
            required
          />

          <div className="flex items-end col-span-12">
            <Button type="submit" className="max-md:w-full text-sm ml-auto">Send</Button>
          </div>
        </Form>
      </Card>

    </div>
  )
};

export default Contact;
