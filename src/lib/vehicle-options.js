// Fill the "vehicle" dropdown of a ContactIntro form with the models from GET /vehicle-models ([{ id, name, … }]).
export function withVehicleOptions(intro, models) {
  const options = models.map((model) => ({
    value: String(model.id),
    label: model.name,
  }));
  return {
    ...intro,
    form: {
      ...intro.form,
      fields: intro.form.fields.map((field) =>
        field.name === "vehicle" ? { ...field, options } : field,
      ),
    },
  };
}
