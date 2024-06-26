const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocument,
  GetCommand,
  PutCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const { AWS_REGION, SitioTuristicoTable } = require("../utils/constants");

const dynamodbClient = new DynamoDB({ region: AWS_REGION });
const dynamodb = DynamoDBDocument.from(dynamodbClient);

const getDynamoDBItem = async (id_reserva) => {
  const params = {
    TableName: SitioTuristicoTable,
    Key: {
      id_reserva,
    },
  };
  console.info("GET PARAMS", params);

  try {
    const command = new GetCommand(params);
    const response = await dynamodb.send(command);

    if (response.Item) {
      return response.Item;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getAllDynamoDBItems = async () => {
  const params = {
    TableName: SitioTuristicoTable
  };
  console.info("SCAN PARAMS", params);

  try {
    const command = new ScanCommand(params);
    const response = await dynamodb.send(command);

    if (response.Items) {
      return response.Items;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postDynamoDBItem = async (id_reserva, Nombres, Apellidos, Fecha_y_hora, No_habitaciones,
  No_baños, No_camas) => {
  try {
    const params = {
      TableName: SitioTuristicoTable,
      Item: {
        id_reserva,
        Nombres: Nombres,
        Apellidos: Apellidos,
        Fecha_y_hora: Fecha_y_hora,
        No_habitaciones: No_habitaciones,
        No_baños: No_baños,
        No_camas: No_camas
      },

    };
    console.info({ msg: "POST PARAMS", params });

    await dynamodb.put(params);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const putDynamoDBItem = async (id_reserva, Nombres, Apellidos, Fecha_y_hora, No_habitaciones,
  No_baños, No_camas) => {
  const params = {
    TableName: SitioTuristicoTable,
    Item: {
      id_reserva,
      Nombres: Nombres,
      Apellidos: Apellidos,
      Fecha_y_hora: Fecha_y_hora,
      No_habitaciones: No_habitaciones,
      No_baños: No_baños,
      No_camas: No_camas
    },
  };
  console.info("PUT PARAMS", params);

  try {
    const command = new PutCommand(params);
    await dynamodb.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteDynamoDBItem = async (id_reserva) => {
  const params = {
    TableName: SitioTuristicoTable,
    Key: {
      id_reserva,
    },
  };
  console.info("DELETE PARAMS", params);

  try {
    const command = new DeleteCommand(params);
    await dynamodb.send(command);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  postDynamoDBItem,
  getDynamoDBItem,
  getAllDynamoDBItems,
  putDynamoDBItem,
  deleteDynamoDBItem,
};
