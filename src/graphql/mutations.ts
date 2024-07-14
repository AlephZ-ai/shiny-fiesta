import gql from "graphql-tag";

// Mutation to update service advisor
export const UPDATE_SERVICE_ADVISOR_MUTATION = gql`
  mutation UpdateServiceAdvisor($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      id
      name
      avatarUrl
      email
      phone
      jobTitle
    }
  }
`;

// Mutation to create an appointment
export const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointment($input: CreateOneEventInput!) {
    createOneEvent(input: $input) {
      id
      title
      description
      startDate
      endDate
    }
  }
`;

// Mutation to update appointment details
export const UPDATE_APPOINTMENT_MUTATION = gql`
  mutation UpdateAppointment($input: UpdateOneEventInput!) {
    updateOneEvent(input: $input) {
      id
      title
      description
      startDate
      endDate
    }
  }
`;

// Mutation to update appointment stage
export const UPDATE_APPOINTMENT_STAGE_MUTATION = gql`
  mutation UpdateAppointmentStage($input: UpdateOneDealStageInput!) {
    updateOneDealStage(input: $input) {
      id
      title
    }
  }
`;

// Mutation to create a new appointment stage
export const CREATE_APPOINTMENT_STAGE_MUTATION = gql`
  mutation CreateAppointmentStage($input: CreateOneDealStageInput!) {
    createOneDealStage(input: $input) {
      id
      title
    }
  }
`;

// Mutation to update checklist of an appointment
export const UPDATE_APPOINTMENT_CHECKLIST_MUTATION = gql`
  mutation UpdateAppointmentChecklist($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
      id
      checklist {
        title
        checked
      }
    }
  }
`;

export const UPDATE_TASK_STAGE_MUTATION = gql`
  mutation UpdateTaskStage($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
      id
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
      id
      title
      completed
      description
      dueDate
      stage {
        id
        title
      }
      users {
        id
        name
        avatarUrl
      }
      checklist {
        title
        checked
      }
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateOneTaskInput!) {
    createOneTask(input: $input) {
      id
      title
      stage {
        id
        title
      }
    }
  }
`;
