const Routes = {
  MyFeedBack: '/my-feedback',
  ShareFeedBack: '/share-feedback',
  SubmitFeedBack: (userId: string) => `/share-feedback/user/${userId}`,
  ViewSubmissions: (userId: string) => `/my-feedback?userId=${userId}`,
  TeamFeedBack: '/team-feedback',
  FeedbackSuccess: '/share-feedback/success',
  NotFound: '/not-found',
}

export default Routes
