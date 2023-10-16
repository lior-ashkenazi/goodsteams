package com.goodsteams.communityservice.dto;

import com.goodsteams.communityservice.entity.Discussion;
import lombok.Data;

import java.util.List;

@Data
public class CommunityDTO {
    private String title;
    private String coverImageUrl;
    private Integer discussionCount;
    private List<Discussion> recentDiscussions;
}