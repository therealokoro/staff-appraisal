export const useFormSchemas = () => {
  const LoginSchema = [
    {
      $formkit: "text",
      name: "loginID",
      label: "Admission No.",
      placeholder: "Enter your email address or admission No.",
      validation: "required"
    },
    {
      $formkit: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      validation: "required"
    }
  ]

  const RegisterSchema = [
    {
      $formkit: "text",
      name: "surname",
      label: "Surname",
      placeholder: "Enter your surname here",
      validation: "required"
    },
    {
      $formkit: "text",
      name: "firstname",
      label: "Firstname",
      placeholder: "Enter your firstname here",
      validation: "required"
    },
    {
      $formkit: "number",
      name: "admissionNo",
      label: "Admission No.",
      placeholder: "Enter your admission number here",
      validation: "required"
    },
    {
      $formkit: "select",
      name: "level",
      label: "Level",
      placeholder: "Select your level address here",
      validation: "required",
      options: ["100", "200", "300", "400", "500"]
    },
    {
      $formkit: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      validation: "required"
    },
    {
      $formkit: "password",
      name: "password_confirm",
      label: "Confirm Password",
      placeholder: "Re-enter your password to confirm",
      validation: "required|confirm",
      validationVisibility: "live",
      validationLabel: "Password confirmation"
    }
  ]

  const EditAccountSchema = [
    {
      $formkit: "text",
      name: "surname",
      label: "Surname",
      placeholder: "Enter your surname here",
      validation: "required"
    },
    {
      $formkit: "text",
      name: "firstname",
      label: "Firstname",
      placeholder: "Enter your firstname here",
      validation: "required"
    },
    {
      $formkit: "number",
      name: "admissionNo",
      label: "Admission No.",
      placeholder: "Enter your admission number here",
      validation: "required"
    },
    {
      $formkit: "select",
      name: "level",
      label: "Level",
      placeholder: "Select your level address here",
      validation: "required",
      options: ["100", "200", "300", "400", "500"]
    }
  ]

  const CreateLecturerSchema = [
    {
      $formkit: "select",
      name: "title",
      label: "Title",
      placeholder: "Select lecturer's title",
      validation: "required",
      options: ["Mr.", "Mrs.", "Dr,", "Prof.", "Mal."]
    },
    {
      $formkit: "text",
      name: "surname",
      label: "Surname",
      placeholder: "Enter lecturer's surname here",
      validation: "required"
    },
    {
      $formkit: "text",
      name: "firstname",
      label: "Firstname",
      placeholder: "Enter lecturer's firstname here",
      validation: "required"
    }
  ]

  const ChangePasswordSchema = [
    {
      $formkit: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      validation: "required"
    },
    {
      $formkit: "password",
      name: "password_confirm",
      label: "Confirm Password",
      placeholder: "Re-enter your password to confirm",
      validation: "required|confirm",
      validationVisibility: "live",
      validationLabel: "Password confirmation"
    }
  ]

  const CourseSchema = [
    {
      $formkit: "text",
      name: "title",
      label: "Course Title",
      placeholder: "Enter the course title here",
      validation: "required"
    },
    {
      $formkit: "text",
      name: "courseCode",
      label: "Course Code",
      placeholder: "Enter the course code here",
      validation: "required"
    },
    {
      $formkit: "select",
      name: "level",
      label: "Level",
      placeholder: "Select your level address here",
      validation: "required",
      options: [
        { label: "100", value: "100" },
        { label: "200", value: "200" },
        { label: "300", value: "300" },
        { label: "400", value: "400" },
        { label: "500", value: "500" }
      ]
    }
  ]

  return {
    LoginSchema,
    RegisterSchema,
    CreateLecturerSchema,
    EditAccountSchema,
    ChangePasswordSchema,
    CourseSchema
  }
}
