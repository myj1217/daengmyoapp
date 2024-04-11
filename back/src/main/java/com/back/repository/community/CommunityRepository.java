package com.back.repository.community;


import com.back.domain.community.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommunityRepository  extends JpaRepository <Community, Long> {
    Optional<Community> selectOne(Long communityBno);

    void updateToDelete(Long communityBno);
}
