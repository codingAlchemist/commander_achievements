const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Achievements", deps: []
 * createTable() => "Events", deps: []
 * createTable() => "Event_Players", deps: []
 * createTable() => "Games", deps: []
 * createTable() => "Game_Players", deps: []
 * createTable() => "Players", deps: []
 * createTable() => "Player_Achievements", deps: []
 * createTable() => "Player_Rewards", deps: []
 * createTable() => "Rewards", deps: []
 * createTable() => "Stores", deps: []
 * createTable() => "Store_Achievements", deps: []
 * createTable() => "Store_Owners", deps: []
 *
 */

const info = {
  revision: 1,
  name: "updates",
  created: "2022-11-25T23:12:53.128Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Achievements",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        desc: { type: Sequelize.STRING, field: "desc" },
        points: { type: Sequelize.INTEGER, field: "points" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Events",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        store: { type: Sequelize.INTEGER, field: "store" },
        event_code: { type: Sequelize.STRING, field: "event_code" },
        date: { type: Sequelize.DATE, field: "date" },
        completed: { type: Sequelize.BOOLEAN, field: "completed" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Event_Players",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        event: { type: Sequelize.INTEGER, field: "event" },
        player: { type: Sequelize.INTEGER, field: "player" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Games",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        rounds: { type: Sequelize.INTEGER, field: "rounds" },
        time_elapsed: { type: Sequelize.DATE, field: "time_elapsed" },
        date_played: { type: Sequelize.DATE, field: "date_played" },
        location: { type: Sequelize.STRING, field: "location" },
        first: { type: Sequelize.INTEGER, field: "first" },
        second: { type: Sequelize.INTEGER, field: "second" },
        third: { type: Sequelize.INTEGER, field: "third" },
        fourth: { type: Sequelize.INTEGER, field: "fourth" },
        createdBy: { type: Sequelize.INTEGER, field: "createdBy" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Game_Players",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        player: { type: Sequelize.INTEGER, field: "player" },
        game: { type: Sequelize.INTEGER, field: "game" },
        won: { type: Sequelize.BOOLEAN, field: "won" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Players",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        password: { type: Sequelize.STRING, field: "password" },
        nickname: { type: Sequelize.STRING, field: "nickname" },
        desc: { type: Sequelize.STRING, field: "desc" },
        level: { type: Sequelize.INTEGER, field: "level" },
        points: { type: Sequelize.INTEGER, field: "points" },
        email: { type: Sequelize.STRING, field: "email" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Player_Achievements",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        player: { type: Sequelize.INTEGER, field: "player" },
        achievement: { type: Sequelize.INTEGER, field: "achievement" },
        completed: { type: Sequelize.BOOLEAN, field: "completed" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Player_Rewards",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        player: { type: Sequelize.INTEGER, field: "player" },
        used: { type: Sequelize.BOOLEAN, field: "used" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Rewards",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        desc: { type: Sequelize.STRING, field: "desc" },
        times_can_use: { type: Sequelize.INTEGER, field: "times_can_use" },
        level_rewarded: { type: Sequelize.INTEGER, field: "level_rewarded" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Stores",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        street: { type: Sequelize.STRING, field: "street" },
        city: { type: Sequelize.STRING, field: "city" },
        zip: { type: Sequelize.STRING, field: "zip" },
        state: { type: Sequelize.STRING, field: "state" },
        logo: { type: Sequelize.STRING, field: "logo" },
        store_number: { type: Sequelize.STRING, field: "store_number" },
        owner: { type: Sequelize.INTEGER, field: "owner" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Store_Achievements",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        store: { type: Sequelize.INTEGER, field: "store" },
        achievement: { type: Sequelize.INTEGER, field: "achievement" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Store_Owners",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        pass: { type: Sequelize.STRING, field: "pass" },
        approved: { type: Sequelize.BOOLEAN, field: "approved" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Achievements", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Events", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Event_Players", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Games", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Game_Players", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Players", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Player_Achievements", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Player_Rewards", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Rewards", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Stores", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Store_Achievements", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Store_Owners", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
