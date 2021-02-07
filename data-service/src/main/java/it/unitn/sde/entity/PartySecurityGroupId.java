package it.unitn.sde.entity;

import java.io.Serializable;
import java.util.UUID;
import java.util.Objects;

public class PartySecurityGroupId implements Serializable {
    /**
     *
     */
    private UUID partyId;
    private String groupId;

    public PartySecurityGroupId(UUID partyId, String groupId) {
        this.partyId = partyId;
        this.groupId = groupId;
    }

    public PartySecurityGroupId() {
    }

    @Override
    public boolean equals(Object o) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }
        PartySecurityGroupId pk = (PartySecurityGroupId) o;
        return Objects.equals( partyId, pk.partyId ) &&
                Objects.equals( groupId, pk.groupId );
    }

    @Override
    public int hashCode() {
        return Objects.hash( partyId, groupId );
    }
}
