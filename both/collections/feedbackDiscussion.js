FeedbackDiscussion = new Mongo.Collection('feedbackDiscussion');

Schemas.FeedbackAnswersSchema = new SimpleSchema({
  feedbackId: {
    type: String
  },
  authorId: {
    type: String,
    autoValue: function () {
      return Meteor.userId()
    }
  },
  message: {
    type: String,
    label: "Answer to the message",
    max: 1000,
    optional: false,
    autoform: {
      rows: 5,
      placeholder: 'Type your message here'
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  }
});

FeedbackAnswers.attachSchema(Schemas.FeedbackAnswersSchema);

FeedbackAnswers.allow({
  insert: function () {
    return true;
  }
});
