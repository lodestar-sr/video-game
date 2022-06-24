import React, {FC, useEffect} from "react";
import classnames from "classnames";
import {Button, Card} from "../../../components";
import {FormControl, Input, useForm} from "../../../components/ReactiveForm";
import {useToggle} from "../../../hooks";

export interface IFilterModel {
  name?: string;
  minScore?: string;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
}

export type IFilterForm = {
  name: FormControl;
  minScore: FormControl;
  orderBy: FormControl;
}

const sortFields = [
  { text: 'Release Date', value: 'releaseDate' },
  { text: 'Score', value: 'rating' },
  { text: 'Name', value: 'name' },
];

export interface IFiltersProps {
  className?: string;
  onChange(filter: IFilterModel): void;
}

const initialFilter: IFilterModel = {
  orderBy: 'releaseDate',
  orderDir: 'desc',
};

const Filters: FC<IFiltersProps> = ({
  className,
  onChange,
}) => {
  const [form, formData] = useForm<IFilterForm>({
    name: new FormControl(initialFilter.name),
    minScore: new FormControl(initialFilter.minScore),
    orderBy: new FormControl(initialFilter.orderBy),
  });
  const [ascending, toggleAscending] = useToggle(initialFilter.orderBy === 'asc');

  useEffect(() => {
    onChange(initialFilter);
  }, []);

  useEffect(() => {
    onChange({
      ...formData,
      orderDir: ascending ? 'asc' : 'desc',
    });
  }, [formData, ascending]);

  const onClearForm = () => {
    form.patch({
      name: initialFilter.name,
      minScore: initialFilter.minScore,
      orderBy: initialFilter.orderBy,
    });
    toggleAscending(initialFilter.orderBy === 'asc');
    onChange(initialFilter);
  };

  return (
    <Card className={className}>
      <h3 className="text-white text-lg mb-6">Filter Results</h3>

      <div className="grid grid-cols-12 gap-x-4 gap-y-6">
        <Input
          control={form.controls.name}
          label="Name (contains)"
          placeholder="Text string"
          containerClass="col-span-12"
          labelClass="text-xs text-white"
          inputClass="text-sm"
          fullWidth
        />

        <Input
          control={form.controls.minScore}
          label="Minimum Score"
          placeholder="1 - 10"
          containerClass="col-span-12 xs:col-span-3 md:!col-span-12"
          labelClass="text-xs text-white"
          inputClass="text-sm"
          fullWidth
        />

        <div className="col-span-12 xs:col-span-7 md:!col-span-12">
          <div className="font-title text-xs text-white mb-1">Order By</div>
          <div className="flex">
            <Button className="w-7 h-7 flex-shrink-0 text-sm !p-0" onClick={() => toggleAscending()}>
              <i className={classnames(
                'fa fa-arrow-down transform transition-all',
                { 'rotate-180': !ascending },
              )} />
            </Button>

            <Input
              control={form.controls.orderBy}
              type="select"
              options={sortFields}
              inputClass="text-sm"
              fullWidth
            />
          </div>
        </div>

        <div className="flex items-end col-span-12 xs:col-span-2 md:!col-span-12">
          <Button className="max-md:w-full text-sm ml-auto" onClick={onClearForm}>Clear</Button>
        </div>
      </div>
    </Card>
  )
};

export default Filters;
