import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'workingDayDurationValidation', async: false })
export class WorkingDayDurationValidation
  implements ValidatorConstraintInterface {
  validate(time: string): boolean {
    const t = parseInt(time);
    return t >= 0 && t < 2359;
  }

  defaultMessage(): string {
    // here you can provide default error message if validation failed
    return 'Time ($value) must be between 0000 and 2359!';
  }
}

// import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";
//
// export function workingDayDurationValidation(property: string, validationOptions?: ValidationOptions) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       name: "workingDayDurationValidation",
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [property],
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           console.log("////////////////////////////////////")
//           console.log(value)
//           console.log("////////////////////////////////////")
//           console.log(args.constraints)
//           const [relatedPropertyName] = args.constraints;
//           const relatedValue = (args.object as any)[relatedPropertyName];
//           return  typeof value === "string" &&
//             typeof relatedValue === "string" &&
//             value.length > relatedValue.length; // you can return a Promise<boolean> here as well, if you want to make async validation
//         }
//       }
//     });
//   };
// }
