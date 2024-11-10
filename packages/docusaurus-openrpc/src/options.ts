import { Joi } from "@docusaurus/utils-validation";

export const OptionsSchema = Joi.object({
	openRPCPath: Joi.string().required(),
});
