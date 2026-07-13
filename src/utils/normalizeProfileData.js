export const normalizeProfileData = (rawProfileData) => {
  const payload =
    rawProfileData?.result?.profile ??
    rawProfileData?.result?.memberProfile ??
    rawProfileData?.result?.userProfile ??
    rawProfileData?.profile ??
    rawProfileData?.memberProfile ??
    rawProfileData?.userProfile ??
    rawProfileData?.result ??
    rawProfileData ??
    {};

  const certificates = Array.isArray(payload.certificates)
    ? payload.certificates
    : Array.isArray(payload.certificates?.recentThree)
      ? payload.certificates.recentThree
      : Array.isArray(payload.certificates?.contents)
        ? payload.certificates.contents
        : Array.isArray(payload.certificates?.list)
          ? payload.certificates.list
          : [];

  return {
    ...payload,
    collaborationTags: Array.isArray(payload.collaborationTags)
      ? payload.collaborationTags
      : [],
    certificates,
    name: payload.name ?? payload.memberName ?? "",
    major: payload.major ?? payload.department ?? "",
    school: payload.school ?? payload.university ?? "",
    contactEmail: payload.contactEmail ?? payload.email ?? "",
    selfIntroduction: payload.selfIntroduction ?? payload.introduction ?? "",
    grade: payload.grade ?? payload.year ?? "",
    gender: payload.gender ?? "",
  };
};
